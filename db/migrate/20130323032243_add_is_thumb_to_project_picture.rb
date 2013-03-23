class AddIsThumbToProjectPicture < ActiveRecord::Migration
  def change
    add_column :project_pictures, :is_thumb, :boolean
  end
end
