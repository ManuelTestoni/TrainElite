from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.http import require_http_methods

from domain.chat.models import Notification

from .session_utils import get_session_user


def api_notifications_list(request):
    user = get_session_user(request)
    if not user:
        return JsonResponse({'error': 'Unauthorized'}, status=401)

    qs = Notification.objects.filter(target_user=user).order_by('-created_at')[:30]
    notifications = [{
        'id': n.id,
        'type': n.notification_type,
        'title': n.title,
        'body': n.body or '',
        'link_url': n.link_url or '',
        'is_read': n.is_read,
        'created_at': n.created_at.isoformat(),
    } for n in qs]
    return JsonResponse({'notifications': notifications})


def api_notifications_unread_count(request):
    user = get_session_user(request)
    if not user:
        return JsonResponse({'count': 0})
    count = Notification.objects.filter(target_user=user, is_read=False).count()
    return JsonResponse({'count': count})


@require_http_methods(["POST"])
def api_notification_mark_read(request, notification_id):
    user = get_session_user(request)
    if not user:
        return JsonResponse({'error': 'Unauthorized'}, status=401)
    n = get_object_or_404(Notification, id=notification_id, target_user=user)
    n.is_read = True
    n.save(update_fields=['is_read'])
    return JsonResponse({'status': 'ok'})


@require_http_methods(["POST"])
def api_notifications_mark_all_read(request):
    user = get_session_user(request)
    if not user:
        return JsonResponse({'error': 'Unauthorized'}, status=401)
    Notification.objects.filter(target_user=user, is_read=False).update(is_read=True)
    return JsonResponse({'status': 'ok'})
