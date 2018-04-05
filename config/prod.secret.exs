use Mix.Config

# In this file, we keep production configuration that
# you'll likely want to automate and keep away from
# your version control system.
#
# You should document the content of this
# file or create a script for recreating it, since it's
# kept out of version control and might be hard to recover
# or recreate for your teammates (or yourself later on).
config :tasktracker, TasktrackerWeb.Endpoint,
  secret_key_base: "SD0nRVirte1PiMAEUuQ4uU51cKSjJLlMpH2tjbPHFZHTam5/6MchDP5l7D9yWzyg"

# Configure your database
config :tasktracker, Tasktracker.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "tasktracker3",
  password: "watermelon",
  database: "tasktracker3_prod",
  pool_size: 15
