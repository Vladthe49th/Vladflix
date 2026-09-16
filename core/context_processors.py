from .forms import UserLoginForm, UserRegistrationForm


def auth_modals(request):
    if request.user.is_authenticated:
        return {}

    return {
        'modal_login_form': UserLoginForm(),
        'modal_register_form': UserRegistrationForm(),
    }
