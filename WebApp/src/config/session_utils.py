from domain.accounts.models import User, CoachProfile, ClientProfile
from domain.coaching.models import CoachingRelationship


def get_session_user(request):
    user_id = request.session.get('user_id')
    if not user_id:
        return None

    try:
        return User.objects.get(id=user_id)
    except User.DoesNotExist:
        request.session.flush()
        return None


def get_session_coach(request):
    user = get_session_user(request)
    if not user or user.role != 'COACH':
        return None

    try:
        return CoachProfile.objects.get(user=user)
    except CoachProfile.DoesNotExist:
        return None


def get_session_client(request):
    user = get_session_user(request)
    if not user or user.role != 'CLIENT':
        return None

    try:
        return ClientProfile.objects.get(user=user)
    except ClientProfile.DoesNotExist:
        return None


def get_active_relationship(client):
    if not client:
        return None

    return (
        CoachingRelationship.objects
        .select_related('coach', 'client')
        .filter(client=client, status='ACTIVE')
        .first()
    )


def build_identity_context(request):
    user = get_session_user(request)
    if not user:
        return {
            'current_user': None,
            'user_role': None,
            'is_coach': False,
            'is_client': False,
            'coach': None,
            'client': None,
            'active_relationship': None,
            'has_coach': False,
            'display_name': 'Utente',
        }

    context = {
        'current_user': user,
        'user_role': user.role,
        'is_coach': False,
        'is_client': False,
        'coach': None,
        'client': None,
        'active_relationship': None,
        'has_coach': False,
        'display_name': user.email,
    }

    if user.role == 'COACH':
        coach = get_session_coach(request)
        context['is_coach'] = True
        context['coach'] = coach
        context['display_name'] = f"{coach.first_name} {coach.last_name}".strip() if coach else user.email
    elif user.role == 'CLIENT':
        client = get_session_client(request)
        relationship = get_active_relationship(client)
        context['is_client'] = True
        context['client'] = client
        context['active_relationship'] = relationship
        context['has_coach'] = relationship is not None
        context['coach'] = relationship.coach if relationship else None
        context['display_name'] = f"{client.first_name} {client.last_name}".strip() if client else user.email

    return context
