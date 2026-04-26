import sys

content = []
with open('/Users/chad/Desktop/Documenti/TrainElite/WebApp/src/domain/accounts/management/commands/seed_accounts.py', 'r') as f:
    content = f.read()

new_content = content.replace("client_profile, created_client_prof = ClientProfile.objects.get_or_create(\n            user=client_user,\n            defaults={\n                'first_name': 'Fre'", "client_user_2, _ = User.objects.get_or_create(email='client2@trainelite.com', defaults={'password_hash': 'hashed_456', 'role': 'CLIENT', 'is_verified': True})\n\n        client_profile_2, created_client_prof_2 = ClientProfile.objects.get_or_create(\n            user=client_user_2,\n            defaults={\n                'first_name': 'Fre'")

with open('/Users/chad/Desktop/Documenti/TrainElite/WebApp/src/domain/accounts/management/commands/seed_accounts.py', 'w') as f:
    f.write(new_content)
