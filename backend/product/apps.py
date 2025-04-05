from django.apps import AppConfig
import sys


class ProductConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'product'

    def ready(self):
        #only run seed script when starting the server
        if 'runserver' in sys.argv:
            from scripts.run_tests import run_tests
            run_tests()
            from product.seed_categories import seed_categories
            seed_categories()
