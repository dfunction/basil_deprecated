class ProjectController < ApplicationController
  def renderAll
    render :renderAll
  end
  def renderOne
    @project = Project.find(params[:id])
    render :renderOne
  end
  def renderCreatePage
    render :createPage
  end
end
