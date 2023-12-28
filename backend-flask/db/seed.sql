-- this file was manually created
INSERT INTO public.users (display_name, handle,email, cognito_user_id)
VALUES
  ('tin', 'tin2003tin', 'andrewbrown@gmail.com' ,'MOCK'),
  ('job', 'job_universe', 'andrewbayko@gmail.com' ,'MOCK'),
  ('nut', 'nut_not_jake', 'andrewbayko@gmail.com' ,'MOCK');

INSERT INTO public.activities (user_uuid, message, expires_at)
VALUES
  (
    (SELECT uuid from public.users WHERE users.handle = 'tin2003tin' LIMIT 1),
    'This was imported as seed data!',
    current_timestamp + interval '10 day'
  )