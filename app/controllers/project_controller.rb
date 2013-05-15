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
    ## Creates new project

    # Generate new project
    @project = Project.create({
      :title => params[:title],
      :year => params[:year],
      :shortDescription => params[:shortDescription],
      :longDescription => params[:longDescription],
      :technologies => params[:technologies]
    })

    if !@project
      render :json => {:error => "Create project Error"}
      return
    end

    # Generate new thumbnail
    @thumbnail = ProjectPicture.new({
      :is_thumb => true,
      :project => @project
    })

    @thumbnailUrl = @thumbnail.getS3Url(params[:thumbnail])
    if @thumbnailUrl[:error]
      render :json => {:error => @thumbnailUrl[:error]}
      return
    end

    @thumbnail.url = @thumbnailUrl[:url]
    if !@thumbnail.save
      render :json => {:error => "Thumbnail save Error"}
      return
    end

    render :json => {:response => "Success"}
    return
  end
end