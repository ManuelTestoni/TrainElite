from django.shortcuts import render, redirect
from django.db.models import Count
from django.utils import timezone
from domain.accounts.models import User, CoachProfile, ClientProfile
from domain.coaching.models import CoachingRelationship
from domain.checks.models import QuestionnaireResponse
from domain.billing.models import SubscriptionPlan, ClientSubscription
from domain.calendar.models import Appointment
import uuid

def dashboard_view(request):
    coach = CoachProfile.objects.first()
    
    if not coach:
         return render(request, 'pages/dashboard.html', {})

    if request.method == 'POST':
        # Gestione dei Form (Modals)
        if 'full_name' in request.POST:
            # Creazione Cliente
            full_name = request.POST.get('full_name', '')
            email = request.POST.get('email', f"{uuid.uuid4().hex[:8]}@example.com")
            goal = request.POST.get('goal', '')
            
            if ' ' in full_name:
                first_name, last_name = full_name.split(' ', 1)
            else:
                first_name, last_name = full_name, ''
            
            # Crea l'utente user auth
            user = User.objects.create(
                email=email,
                password_hash='hashed_password',
                role='CLIENT',
                is_active=True
            )
            
            # Crea il profilo cliente
            client = ClientProfile.objects.create(
                user=user,
                first_name=first_name,
                last_name=last_name,
                date_of_birth=timezone.now().date(),
                primary_goal=goal,
                gender='M',
                phone_number='',
                height_cm=170,
                weight_kg=70.0
            )
            
            # Lega il cliente al coach
            CoachingRelationship.objects.create(
                coach=coach,
                client=client,
                status='ACTIVE',
                start_date=timezone.now().date()
            )
            return redirect('dashboard')
            
        elif 'plan_name' in request.POST:
            # Creazione Piano Abbonamento
            plan_name = request.POST.get('plan_name')
            price = request.POST.get('price')
            duration = request.POST.get('duration')
            
            if plan_name and price and duration:
                SubscriptionPlan.objects.create(
                    coach=coach,
                    name=plan_name,
                    price=price,
                    duration_days=duration,
                    plan_type='RECURRING',
                    is_active=True
                )
            return redirect('dashboard')

    total_clients = ClientProfile.objects.filter(coaching_relationships_as_client__coach=coach).distinct().count()
    checks_to_review = QuestionnaireResponse.objects.filter(coach=coach, status='PENDING').count()
    expiring_subscriptions = ClientSubscription.objects.filter(
        client__coaching_relationships_as_client__coach=coach,
        status='ACTIVE',
        end_date__lte=timezone.now().date() + timezone.timedelta(days=7)
    ).distinct().count()
    appointments_today = Appointment.objects.filter(
        coach=coach,
        start_datetime__date=timezone.now().date()
    ).count()

    recent_clients = ClientProfile.objects.filter(coaching_relationships_as_client__coach=coach).distinct().order_by('-created_at')[:5]
    subscription_plans = SubscriptionPlan.objects.filter(coach=coach, is_active=True)

    context = {
        'coach': coach,
        'total_clients': total_clients,
        'checks_to_review': checks_to_review,
        'expiring_subscriptions': expiring_subscriptions,
        'appointments_today': appointments_today,
        'recent_clients': recent_clients,
        'subscription_plans': subscription_plans,
    }
    
    return render(request, 'pages/dashboard.html', context)
