# Generated by Django 5.0.6 on 2024-06-27 19:27

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Producto',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('nombre', models.TextField()),
                ('precio', models.IntegerField()),
                ('foto', models.ImageField(upload_to='productos/')),
                ('tipo_producto', models.CharField(choices=[('bandana', 'Bandana'), ('correa', 'Correa')], default='bandana', max_length=20)),
                ('marca', models.CharField(choices=[('max_and_molly', 'Max & Molly'), ('the_black_dog', 'The Black Dog'), ('wildebeest', 'Wildebeest'), ('wilderdog', 'Wilderdog')], default='max_and_molly', max_length=20)),
            ],
        ),
    ]
