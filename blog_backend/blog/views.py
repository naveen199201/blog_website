from rest_framework import viewsets
from .models import Article, Category, Comment
from django.contrib.auth.models import User
from rest_framework import permissions,status
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from .serializers import ArticleSerializer, CategorySerializer, CommentSerializer, UserLoginSerializer,UserSerializer
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ArticleViewSet(viewsets.ModelViewSet):
    
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly ]

    def retrieve(self, request, *args, **kwargs):
        
        instance = self.get_object()
        serializer = self.get_serializer(instance)

        # Retrieve comments associated with the article
        comments = Comment.objects.filter(article=instance)
        comment_data = []
        for comment in comments:
            comment_serializer = CommentSerializer(comment)
            user_serializer = UserSerializer(comment.user)
            comment_data.append({
                'comment': comment_serializer.data.get('text'),
                'comment_created_at': comment_serializer.data.get('created_at'),
                'user': user_serializer.data
            })
        serializer_data = dict(serializer.data)
        serializer_data['comments'] = comment_data
        print(type(serializer_data))
        return Response(serializer_data)
    
class CommentViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    def perform_create(self, serializer):
        article_id = self.request.data.get('article')
        article_obj = Article.objects.get(id=article_id)
        serializer.validated_data['article'] = article_obj
        serializer.save(user=self.request.user)

class UserRegistrationView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        # Generate token for the user
        token, _ = Token.objects.get_or_create(user=user)

        return Response(
            {
                'email': user.email,
                'username':user.username,
                'token': token.key,
            },
            status=status.HTTP_201_CREATED
        )

class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email,
            'username':user.username,
        })
