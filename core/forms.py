from django import forms
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from .models import Profile

class UserLoginForm(AuthenticationForm):
    class Meta:
        model = User
        fields = ['username', 'password']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['username'].widget.attrs.update({
            'class': 'form-input',
            'placeholder': 'Введите имя пользователя'
        })
        self.fields['password'].widget.attrs.update({
            'class': 'form-input',
            'placeholder': 'Введите пароль'
        })

class UserRegistrationForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['username', 'email']  

    email = forms.EmailField(
        required=True,
        widget=forms.EmailInput(attrs={
            'class': 'form-input',
            'placeholder': 'Введите ваш email'
        })
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['username'].widget.attrs.update({
            'class': 'form-input',
            'placeholder': 'Придумайте имя пользователя'
        })
        self.fields['password1'].widget.attrs.update({
            'class': 'form-input',
            'placeholder': 'Введите пароль'
        })
        self.fields['password2'].widget.attrs.update({
            'class': 'form-input',
            'placeholder': 'Повторите пароль'
        })

class ProfileForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ['display_name', 'avatar']

    email = forms.EmailField(
        required=True,
        widget=forms.EmailInput(attrs={
            'class': 'form-control',
            'placeholder': 'Введите ваш email'
        })
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        if self.instance and self.instance.user:
            self.fields['email'].initial = self.instance.user.email

        self.fields['display_name'].widget.attrs.update({
            'class': 'form-control',
            'placeholder': 'Введите отображаемое имя'
        })
        self.fields['avatar'].widget.attrs.update({
            'class': 'form-control-file'
        })

    def save(self, commit=True):
        profile = super().save(commit=False)
        new_email = self.cleaned_data.get('email')
        if new_email is not None and profile.user:
            profile.user.email = new_email
            if commit:
                profile.user.save()

        if commit:
            profile.save()
        return profile