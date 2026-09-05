from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import login

from .forms import UserLoginForm, UserRegistrationForm

def index(request):
    return render(request, 'core/index.html')

def user_login(request):
    if request.user.is_authenticated:
        return redirect('core:index')

    if request.method == 'POST':
        form = UserLoginForm(request, data=request.POST)

        if form.is_valid():
            user = form.get_user()
            
            login(request, user)
            
            messages.success(request, f'Добро пожаловать, {user.username}!')
            return redirect('core:index') 
        else:
            messages.error(request, 'Неверное имя пользователя или пароль.')

    else:
        form = UserLoginForm()

    return render(request, 'core/login.html', {'form': form})


def user_register(request):
    if request.user.is_authenticated:
        return redirect('core:index')

    if request.method == 'POST':
        form = UserRegistrationForm(request.POST)
        if form.is_valid():
            user = form.save()

            login(request, user)
            
            messages.success(request, f'Аккаунт {user.username} успешно создан!')
            return redirect('core:index')
        else:
            messages.error(request, 'Пожалуйста, исправьте ошибки при регистрации.')
    else:
        form = UserRegistrationForm()

    return render(request, 'core/registration.html', {'form': form})