from django.db import models

class NutritionPlan(models.Model):
    coach = models.ForeignKey('accounts.CoachProfile', on_delete=models.CASCADE, related_name='nutrition_plans')
    title = models.CharField(max_length=200)
    description = models.TextField(null=True, blank=True)
    plan_type = models.CharField(max_length=100, null=True, blank=True)
    nutrition_goal = models.CharField(max_length=200, null=True, blank=True)
    daily_kcal = models.IntegerField(null=True, blank=True)
    protein_target_g = models.IntegerField(null=True, blank=True)
    carb_target_g = models.IntegerField(null=True, blank=True)
    fat_target_g = models.IntegerField(null=True, blank=True)
    meals_per_day = models.IntegerField(null=True, blank=True)
    status = models.CharField(max_length=50) # Es: DRAFT, PUBLISHED
    is_template = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} (by {self.coach})"


class NutritionAssignment(models.Model):
    nutrition_plan = models.ForeignKey(NutritionPlan, on_delete=models.CASCADE, related_name='assignments')
    client = models.ForeignKey('accounts.ClientProfile', on_delete=models.CASCADE, related_name='nutrition_assignments')
    coach = models.ForeignKey('accounts.CoachProfile', on_delete=models.CASCADE, related_name='nutrition_assignments_given')
    assigned_at = models.DateTimeField(auto_now_add=True)
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=50) # Es: ACTIVE, COMPLETED, CANCELLED
    notes = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Plan {self.nutrition_plan.title} for {self.client}"
