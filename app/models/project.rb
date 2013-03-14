class Project < ActiveRecord::Base
  attr_accessible :longDescription, :shortDescription, :technologies, :title, :year
  has_many :project_picture
end
