from .session_utils import build_identity_context, get_session_user

_NOTIF_SECTION = {
    'CHECK_SUBMITTED': 'check',
    'CHECK_REVIEWED': 'check',
    'WORKOUT_ASSIGNED': 'allenamenti',
    'NUTRITION_ASSIGNED': 'nutrizione',
    'SUPPLEMENT_ASSIGNED': 'nutrizione',
    'MESSAGE': 'chat',
    'APPOINTMENT_REQUEST': 'chat',
    'APPOINTMENT_ACCEPTED': 'chat',
    'APPOINTMENT_REJECTED': 'chat',
}


def _get_current_section(path):
    if path == '/':
        return 'dashboard'
    if path.startswith('/clienti'):
        return 'clienti'
    if path.startswith('/allenamenti'):
        return 'allenamenti'
    if path.startswith('/nutrizione'):
        return 'nutrizione'
    if path.startswith('/agenda'):
        return 'agenda'
    if path.startswith('/chat'):
        return 'chat'
    if path.startswith('/check'):
        return 'check'
    if path.startswith('/abbonamenti'):
        return 'abbonamenti'
    if path.startswith('/il-mio-coach') or path.startswith('/il-mio-specialista'):
        return 'specialista'
    if path.startswith('/impostazioni'):
        return 'impostazioni'
    return ''


def identity_context(request):
    ctx = build_identity_context(request)
    ctx['current_section'] = _get_current_section(request.path)

    from domain.chat.models import Notification
    user = get_session_user(request)
    sidebar_notifications = {}
    if user:
        for ntype in Notification.objects.filter(target_user=user, is_read=False).values_list('notification_type', flat=True):
            sec = _NOTIF_SECTION.get(ntype)
            if sec:
                sidebar_notifications[sec] = sidebar_notifications.get(sec, 0) + 1
    ctx['sidebar_notifications'] = sidebar_notifications
    return ctx
