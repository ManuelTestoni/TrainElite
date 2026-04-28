from .session_utils import build_identity_context


def identity_context(request):
    return build_identity_context(request)
