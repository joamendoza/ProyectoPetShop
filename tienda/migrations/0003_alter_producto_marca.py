# Generated by Django 5.0.6 on 2024-06-29 01:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tienda', '0002_producto_producto_popular_alter_producto_nombre'),
    ]

    operations = [
        migrations.AlterField(
            model_name='producto',
            name='marca',
            field=models.CharField(choices=[('max_and_molly', 'Max & Molly'), ('the_black_dog', 'The Black Dog'), ('wildebeest', 'Wildebeest'), ('wilderdog', 'Wilderdog')], default='the_black_dog', max_length=20),
        ),
    ]