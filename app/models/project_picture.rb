class ProjectPicture < ActiveRecord::Base
  attr_accessible :project_id, :url
  belongs_to :project
end
