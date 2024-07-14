# Generated by Django 5.0.6 on 2024-07-14 00:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tienda', '0005_remove_purchase_user_userprofile_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='purchase',
            name='total_price',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
            preserve_default=False,
        ),
    ]
