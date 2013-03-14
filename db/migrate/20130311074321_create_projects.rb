class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
      t.string :title
      t.integer :year
      t.text :shortDescription
      t.text :longDescription
      t.text :technologies

      t.timestamps
    end
  end
end
