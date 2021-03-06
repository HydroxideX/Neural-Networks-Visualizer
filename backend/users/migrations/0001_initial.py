# Generated by Django 3.1.1 on 2020-09-18 22:33

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=50)),
                ('email', models.CharField(max_length=50, unique=True)),
                ('password', models.CharField(max_length=150)),
                ('is_active', models.BooleanField(default=False)),
                ('is_verified', models.BooleanField(default=False)),
                ('code', models.CharField(max_length=50)),
                ('drawings', models.JSONField()),
            ],
        ),
    ]
