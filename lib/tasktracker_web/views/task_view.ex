defmodule TasktrackerWeb.TaskView do
  use TasktrackerWeb, :view
  alias TasktrackerWeb.TaskView
  alias TasktrackerWeb.UserView

  def render("index.json", %{tasks: tasks}) do
    %{data: render_many(tasks, TaskView, "task.json")}
  end

  def render("show.json", %{task: task}) do
    %{data: render_one(task, TaskView, "task.json")}
  end

  def render("task.json", %{task: task}) do
    %{id: task.id,
      complete: task.complete,
      desc: task.desc,
      time_spent: task.time_spent,
      title: task.title,
      user: render_one(task.user, UserView, "user.json")}
  end
end
