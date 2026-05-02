from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

from domain.accounts.models import ClientProfile
from domain.workouts.models import Exercise, WorkoutPlan, WorkoutDay, WorkoutExercise, WorkoutAssignment

from .session_utils import get_session_user, get_session_coach, get_session_client, get_active_relationship, can_manage_workouts


def allenamenti_create_view(request):
    coach = get_session_coach(request)
    if not coach or not can_manage_workouts(coach):
        return redirect('dashboard')
    
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            title = data.get('title')
            description = data.get('description', '')
            goal = data.get('goal')
            level = data.get('level')
            client_id = data.get('client_id')
            
            if not title or not client_id:
                return JsonResponse({'error': 'Titolo e Cliente sono obbligatori'}, status=400)
                
            client = ClientProfile.objects.get(id=client_id, coaching_relationships_as_client__coach=coach)
            
            plan = WorkoutPlan.objects.create(
                coach=coach,
                title=title,
                description=description,
                goal=goal,
                level=level
            )
            
            WorkoutAssignment.objects.create(
                workout_plan=plan,
                client=client,
                coach=coach,
                status=data.get('status', 'ACTIVE')
            )
            
            days_data = data.get('days', [])
            for day_idx, day_data in enumerate(days_data):
                day = WorkoutDay.objects.create(
                    workout_plan=plan,
                    day_order=day_idx + 1,
                    day_name=day_data.get('name', f'Giorno {day_idx + 1}')
                )
                
                exercises_data = day_data.get('exercises', [])
                for ex_idx, ex_data in enumerate(exercises_data):
                    exercise_id = ex_data.get('exercise_id')
                    if exercise_id:
                        exercise = Exercise.objects.get(id=exercise_id)
                        set_str = str(ex_data.get('sets', '3'))
                        rep_str = str(ex_data.get('reps', '10'))
                        set_count = int(set_str) if set_str.isdigit() else 3
                        
                        WorkoutExercise.objects.create(
                            workout_day=day,
                            exercise=exercise,
                            order_index=ex_idx + 1,
                            set_count=set_count,
                            rep_range=rep_str,
                            tempo=ex_data.get('rest', '90s'),
                            technique_notes=ex_data.get('notes', '')
                        )
            
            return JsonResponse({'status': 'success', 'redirect_url': '/allenamenti/'})
            
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
            
    return render(request, 'pages/allenamenti/create.html', {'coach': coach})


def api_search_clients(request):
    coach = get_session_coach(request)
    if not coach or not can_manage_workouts(coach):
        return JsonResponse([], safe=False)
    query = request.GET.get('q', '')
    
    clients = ClientProfile.objects.filter(
        coaching_relationships_as_client__coach=coach,
        first_name__icontains=query
    ) | ClientProfile.objects.filter(
        coaching_relationships_as_client__coach=coach,
        last_name__icontains=query
    )
    clients = clients.distinct()[:10]
    
    data = [{'id': c.id, 'name': f"{c.first_name} {c.last_name}"} for c in clients]
    return JsonResponse(data, safe=False)


def api_search_exercises(request):
    query = request.GET.get('q', '')
    exercises = Exercise.objects.filter(name__icontains=query)[:20]
    data = [{'id': e.id, 'name': e.name, 'target': e.target_muscles or 'Generale', 'exercise_type': e.exercise_type or ''} for e in exercises]
    return JsonResponse(data, safe=False)


def allenamenti_list_view(request):
    user = get_session_user(request)
    if not user:
        return redirect('login')

    query = request.GET.get('q', '')
    filter_status = request.GET.get('status', '')

    if user.role == 'CLIENT':
        client = get_session_client(request)
        relationship = get_active_relationship(client)
        if not relationship:
            return redirect('check_coach_directory')

        assignments = WorkoutAssignment.objects.filter(
            client=client,
            coach=relationship.coach,
        ).select_related('workout_plan', 'client')
        
        if query:
            assignments = assignments.filter(workout_plan__title__icontains=query)
        
        if filter_status:
            assignments = assignments.filter(status=filter_status)

        return render(request, 'pages/allenamenti/client_list.html', {
            'assignments': assignments.distinct(),
            'query': query,
            'filter_status': filter_status,
            'is_client': True,
            'client': client,
            'coach': relationship.coach,
            'has_coach': True,
        })

    coach = get_session_coach(request)
    if not coach or not can_manage_workouts(coach):
        return redirect('dashboard')

    assignments = WorkoutAssignment.objects.filter(coach=coach).select_related('workout_plan', 'client')
    
    if query:
        assignments = assignments.filter(workout_plan__title__icontains=query) | \
                      assignments.filter(client__first_name__icontains=query) | \
                      assignments.filter(client__last_name__icontains=query)
                      
    if filter_status:
        assignments = assignments.filter(status=filter_status)

    return render(request, 'pages/allenamenti/list.html', {
        'assignments': assignments.distinct(),
        'query': query,
        'filter_status': filter_status,
        'is_coach': True,
        'coach': coach,
    })


def allenamenti_edit_view(request, assignment_id):
    coach = get_session_coach(request)
    if not coach or not can_manage_workouts(coach):
        return redirect('dashboard')
    assignment = WorkoutAssignment.objects.select_related('workout_plan', 'client').get(id=assignment_id, coach=coach)
    plan = assignment.workout_plan
    
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            plan.title = data.get('title', plan.title)
            plan.description = data.get('description', plan.description)
            plan.goal = data.get('goal', plan.goal)
            plan.level = data.get('level', plan.level)
            plan.save()
            
            assignment.status = data.get('status', 'ACTIVE')
            assignment.save()
            
            WorkoutDay.objects.filter(workout_plan=plan).delete()
            
            days_data = data.get('days', [])
            for day_idx, day_data in enumerate(days_data):
                day = WorkoutDay.objects.create(
                    workout_plan=plan,
                    day_order=day_idx + 1,
                    day_name=day_data.get('name', f'Giorno {day_idx + 1}')
                )
                
                exercises_data = day_data.get('exercises', [])
                for ex_idx, ex_data in enumerate(exercises_data):
                    exercise_id = ex_data.get('exercise_id')
                    if exercise_id:
                        exercise = Exercise.objects.get(id=exercise_id)
                        set_str = str(ex_data.get('sets', '3'))
                        rep_str = str(ex_data.get('reps', '10'))
                        set_count = int(set_str) if set_str.isdigit() else 3
                        WorkoutExercise.objects.create(
                            workout_day=day,
                            exercise=exercise,
                            order_index=ex_idx + 1,
                            set_count=set_count,
                            rep_range=rep_str,
                            tempo=ex_data.get('rest', '90s'),
                            technique_notes=ex_data.get('notes', '')
                        )
            
            return JsonResponse({'status': 'success', 'redirect_url': '/allenamenti/'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
            
    days_serialized = []
    for day in WorkoutDay.objects.filter(workout_plan=plan).order_by('day_order'):
        exercises_serialized = []
        for ex in WorkoutExercise.objects.filter(workout_day=day).select_related('exercise').order_by('order_index'):
            exercises_serialized.append({
                'exercise_id': ex.exercise.id,
                'name': ex.exercise.name,
                'target': ex.exercise.target_muscles,
                'sets': str(ex.set_count),
                'reps': ex.rep_range,
                'rest': ex.tempo,
                'notes': ex.technique_notes,
            })
        days_serialized.append({
            'id': day.day_order,
            'name': day.day_name,
            'exercises': exercises_serialized
        })
        
    context = {
        'coach': coach,
        'edit_mode': True,
        'assignment_id': assignment.id,
        'plan_data': json.dumps({
            'title': plan.title,
            'description': plan.description,
            'goal': plan.goal,
            'level': plan.level,
            'client_id': assignment.client.id,
            'client_name': f"{assignment.client.first_name} {assignment.client.last_name}",
            'days': days_serialized
        })
    }
    return render(request, 'pages/allenamenti/create.html', context)
