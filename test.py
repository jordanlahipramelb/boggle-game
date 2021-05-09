from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle


class FlaskTests(TestCase):

    # TODO -- write tests for every view function / feature!

    def test_homepage(self):
        """Test if the homepage is set up"""
        with app.test_client() as client:
            resp = client.get("/")
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn("board", session)
            self.assertIsNone(session.get("high_score"))
            self.assertIn("Your high score is <b>0!</b>", html)
            self.assertIsNone(session.get("num_plays"))
