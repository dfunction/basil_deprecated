class CreateProjectPictures < ActiveRecord::Migration
  def change
    create_table :project_pictures do |t|
      t.string :url
      t.integer :project_id

      t.timestamps
    end
  end
end
