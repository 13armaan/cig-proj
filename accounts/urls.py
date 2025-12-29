from django.urls import path
from .views import UserListView,RegisterAPIView, VerifyOTPAPIView, LoginAPIView, omniport_login, omniport_callback;

urlpatterns = [
    path("users/", UserListView.as_view()),
    path("register/", RegisterAPIView.as_view()),
    path("verify-otp/", VerifyOTPAPIView.as_view()),
    path("login/", LoginAPIView.as_view()),
    path("auth/omniport/login/", omniport_login),
    path("auth/omniport/callback/", omniport_callback),
]
