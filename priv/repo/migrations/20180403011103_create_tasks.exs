defmodule Tasktracker.Repo.Migrations.CreateTasks do
  use Ecto.Migration

  def change do
    create table(:tasks) do
      add :complete, :boolean, default: false, null: false
      add :desc, :string
      add :time_spent, :integer
      add :title, :string
      add :user_id, references(:users, on_delete: :nothing)

      timestamps()
    end

    create index(:tasks, [:user_id])
  end
end
