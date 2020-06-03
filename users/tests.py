from django.test import TestCase, Client

class LoginTests(TestCase):
    
    def test_1(self):
        c = Client()
        response = c.post('/users/authenticate/', {'username': 'john', 'password': 'smith'})
        
        self.assertIs(response.status_code, 401)
        
    def test_2(self):
        c = Client()
        response = c.post('/users/authenticate/', {'username': 'tester', 'password': 'tester123'})
        
        self.assertIs(response.status_code, 201)