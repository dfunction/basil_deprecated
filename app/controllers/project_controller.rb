require 'securerandom'

class ProjectController < ApplicationController
  def renderAll
    render :renderAll
  end
  def renderOne
    @project = Project.find(params[:id])
    @result = params[:result]
    @pictures = @project.project_picture.where(:is_thumb => false)
    render :renderOne
  end
  def renderCreatePage
    render :createPage
  end
  def createAction
    ## Creates new project
    # Todo:
    # => Test error conditions

    # Generate new project
    @project = Project.new({
      :title => params[:title],
      :year => params[:year],
      :shortDescription => params[:shortDescription],
      :longDescription => params[:longDescription],
      :technologies => params[:technologies]
    })

    if !@project.save
      render :json => {:error => "Create project Error"}
      return
    end

    # Generate new thumbnail
    if !params[:thumbnail]
      @project.destroy()
      render :json => {:error => "No thumbnail provided"}
      return
    end

    @thumbnail = ProjectPicture.new({
      :is_thumb => true,
      :project => @project
    })

    @thumbnailUrl = @thumbnail.getS3Url(params[:thumbnail])
    if @thumbnailUrl[:error]
      @project.destroy()
      render :json => {:error => @thumbnailUrl[:error]}
      return
    end

    @thumbnail.url = @thumbnailUrl[:url]
    if !@thumbnail.save
      @thumbnail.destroyS3Image
      @project.destroy()
      render :json => {:error => "Thumbnail save Error"}
      return
    end

    # Generate images
    if !params[:images]
      @thumbnail.destroyS3Image
      @thumbnail.destroy
      @project.destroy()
      render :json => {:error => "No images provided"}
      return
    end

    @images = []
    for @paramImage in params[:images]
      @image = ProjectPicture.new({
        :is_thumb => false,
        :project => @project
      })

      @imageUrl = @image.getS3Url(@paramImage)
      if @imageUrl[:error]
        @project.destroy()
        @thumbnail.destroyS3Image
        @thumbnail.destroy()

        for @imageToDestroy in @images
          @imageToDestroy.destroyS3Image
          @imageToDestroy.destroy
        end

        render :json => {:error => @imageUrl[:error]}
        return
      end

      @image.url = @imageUrl[:url]
      if !@image.save
        @project.destroy()
        @thumbnail.destroyS3Image
        @thumbnail.destroy()

        for @imageToDestroy in @images
          @imageToDestroy.destroyS3Image
          @imageToDestroy.destroy
        end

        @image.destroyS3Image

        render :json => "Image save Error"
        return
      end

      @images.append @image
    end

    render :json => {:response => "Success"}
    return
  end
end