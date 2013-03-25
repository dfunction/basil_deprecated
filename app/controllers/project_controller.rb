class ProjectController < ApplicationController
  def rasterizeAll
    render :rasterizeAll
  end
  def rasterizeOne
    @project = Project.find(params[:id])
    render :rasterizeOne
  end
end
