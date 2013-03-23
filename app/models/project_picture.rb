class ProjectPicture < ActiveRecord::Base
  attr_accessible :project_id, :url, :is_thumb
  belongs_to :project
end
