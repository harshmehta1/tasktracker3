# Tasktracker : A SPA.

Design Choices:

1. The initial page will display a registration form as well as a login form.
2. User can choose to either regiter or login.
3. On registration, user will not be redirected and will have to login to see the tasks.
4. Once logged in, the user will see a form to create tasks and any tasks that are assigned to him/her.
5. User can fill the form and assign to either himself or other users. Clicking submit will create the task.
6. If task created is assigned to self, it will immediately appear in the task feed below.
7. The task feed includes all information about the task as well as the edit and delete button.
8. Edit button takes you to the edit page where user can edit any field of the task.
9. User can mark task as completed by clicking on edit, clicking the complete checkbox and submitting the form.
10. Task can directly be deleted from the task feed.
11. Any changes to tasks will be visible immediately in the task feed.
12. Users cannot see, edit or delete other users tasks.
13. The whole web app has been developed as an SPA and uses Redux for client side state management.
14. User can logout using the logout button on the top right corner.


To start your Phoenix server:

  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.create && mix ecto.migrate`
  * Install Node.js dependencies with `cd assets && npm install`
  * Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Ready to run in production? Please [check our deployment guides](http://www.phoenixframework.org/docs/deployment).

## Learn more

  * Official website: http://www.phoenixframework.org/
  * Guides: http://phoenixframework.org/docs/overview
  * Docs: https://hexdocs.pm/phoenix
  * Mailing list: http://groups.google.com/group/phoenix-talk
  * Source: https://github.com/phoenixframework/phoenix
