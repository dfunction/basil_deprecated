require 'securerandom'

class ProjectController < ApplicationController
  def renderAll
    render :renderAll
  end
  def renderOne
    @project = Project.find(params[:id])
    @result = params[:result]
    render :renderOne
  end
  def renderCreatePage
    render :createPage
  end
  def createAction
    @project = Project.new({
      :title => params[:title],
      :year => params[:year],
      :shortDescription => params[:shortDescription],
      :longDescription => params[:longDescription],
      :technologies => params[:technologies]
    })
    if @project.save
      response = 'success'
      redirect_to :action => "renderOne", :id => @project, :result => response
    else
      response = 'error'
      render :json => response
    end
  end
end