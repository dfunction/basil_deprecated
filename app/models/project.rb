class Project < ActiveRecord::Base
  attr_accessible :longDescription, :shortDescription, :technologies, :title, :year
  has_many :project_picture

  validates :longDescription, :presence => true
  validates :shortDescription, :presence => true
  validates :technologies, :presence => true
  validates :title, :presence => true
  validates :year, :presence => true
end
