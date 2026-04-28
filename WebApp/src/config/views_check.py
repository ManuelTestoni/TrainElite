from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.utils import timezone
from django.core.files.storage import FileSystemStorage
from domain.checks.models import QuestionnaireTemplate, QuestionnaireResponse, ProgressPhoto
import json

from .session_utils import get_session_user, get_session_coach, get_session_client, get_active_relationship


def check_create_view(request):
    user = get_session_user(request)
    if not user:
        return redirect('login')

    if user.role == 'CLIENT':
        client = get_session_client(request)
        relationship = get_active_relationship(client)
        context = {
            'has_coach': relationship is not None,
            'client': client,
            'coach': relationship.coach if relationship else None,
        }
        if request.method == 'GET':
            return render(request, 'pages/check/create.html', context)
        if not relationship:
            return redirect('check_coach_directory')
    else:
        context = {}
        if request.method == 'GET':
            return render(request, 'pages/check/create.html', context)
        
    if request.method == 'POST':
        coach = get_session_coach(request)
        client = get_session_client(request)
        if not coach or not client:
            return redirect('login')
        
        template, _ = QuestionnaireTemplate.objects.get_or_create(
            coach=coach,
            title="Check Settimanale Standard",
            defaults={
                'questionnaire_type': 'weekly_check',
                'phase': 'Generica',
                'is_active': True
            }
        )
        
        weight_kg = request.POST.get('weight_kg')
        if not weight_kg:
            weight_kg = None
        if weight_kg:
            try:
                weight_kg = float(weight_kg)
            except ValueError:
                weight_kg = None
            
        body_circumferences = {
            'shoulders': request.POST.get('circ_spalle', ''),
            'chest': request.POST.get('circ_petto', ''),
            'waist': request.POST.get('circ_vita', ''),
            'hips': request.POST.get('circ_fianchi', ''),
            'thigh_right': request.POST.get('circ_coscia', ''),
            'arm_right': request.POST.get('circ_braccio', '')
        }
        
        skinfolds = {
            'chest': request.POST.get('pl_petto', ''),
            'abdomen': request.POST.get('pl_addome', ''),
            'thigh': request.POST.get('pl_coscia', ''),
            'tricep': request.POST.get('pl_tricipite', '')
        }
        
        answers_json = {
            'mood': request.POST.get('ans_mood', ''),
            'diet_adherence': request.POST.get('ans_diet', ''),
            'workout_adherence': request.POST.get('ans_workout', '')
        }
        
        injuries = request.POST.get('injuries', '')
        limitations = request.POST.get('limitations', '')
        notes = request.POST.get('notes', '')
        
        response = QuestionnaireResponse.objects.create(
            questionnaire_template=template,
            client=client,
            coach=coach,
            submitted_at=timezone.now(),
            status='COMPLETED',
            weight_kg=weight_kg,
            body_circumferences=body_circumferences,
            skinfolds=skinfolds,
            answers_json=answers_json,
            injuries=injuries,
            limitations=limitations,
            notes=notes
        )
        
        fs = FileSystemStorage()
        
        for key, photo_type in [('photo_front', 'Front'), ('photo_side', 'Side'), ('photo_back', 'Back')]:
            file = request.FILES.get(key)
            if file:
                filename = fs.save(f"progress_photos/{client.id}/{file.name}", file)
                file_url = fs.url(filename)
                
                ProgressPhoto.objects.create(
                    client=client,
                    coach=coach,
                    questionnaire_response=response,
                    file_url=file_url,
                    photo_type=photo_type,
                    captured_at=timezone.now()
                )
                
        return redirect('check_dashboard')


def check_dashboard_view(request):
    coach = get_session_coach(request)
    if not coach:
        return redirect('login')
    
    responses = QuestionnaireResponse.objects.filter(coach=coach).order_by('-submitted_at')
    
    to_review = responses.filter(status='COMPLETED')
    reviewed = responses.filter(status='REVIEWED')
    
    context = {
        'to_review_count': to_review.count(),
        'reviewed_count': reviewed.count(),
        'responses': responses,
    }
    return render(request, 'pages/check/dashboard.html', context)
