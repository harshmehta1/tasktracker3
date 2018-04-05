defmodule Tasktracker.Users.User do
  use Ecto.Schema
  import Ecto.Changeset


  schema "users" do
    field :email, :string
    field :name, :string
    field :password_hash, :string
    field :password, :string, virtual: true

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    IO.inspect(attrs)
    user
    |> cast(attrs, [:name, :email, :password_hash])
    |> unique_constraint(:email)
    |> validate_required([:name, :email])
    |> validate_format(:email, ~r/@/)
  end
end
