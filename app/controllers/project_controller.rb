require 'securerandom'

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
  def createAction
    Rails.logger.debug AWS::S3::Service.buckets[0].name
    redirect_to '/projects'
  end
end
