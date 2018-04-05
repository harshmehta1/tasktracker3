# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Tasktracker.Repo.insert!(%Tasktracker.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
defmodule Seeds do
  alias Tasktracker.Repo
  alias Tasktracker.Users.User
  alias Tasktracker.Tasks.Task
  # field :complete, :boolean, default: false
  # field :desc, :string
  # field :time_spent, :integer
  # field :title, :string
  # field :user_id, :id

  def run do
    Repo.delete_all(User)
    p = Comeonin.Argon2.hashpwsalt("letmein")
    h = Repo.insert!(%User{ name: "Harsh", email: "harsh@h.com", password_hash: p })
    s = Repo.insert!(%User{ name: "Saloni", email: "sal@s.com", password_hash: p })

    Repo.delete_all(Task)
    Repo.insert!(%Task{ user_id: h.id, complete: false, desc: "Do the dance. Do the dance.", time_spent: 30, title: "Dance Task" })
    Repo.insert!(%Task{ user_id: s.id, complete: false, desc: "Drop it like its hot.", time_spent: 45, title: "Rap Task" })
  end
end

Seeds.run
