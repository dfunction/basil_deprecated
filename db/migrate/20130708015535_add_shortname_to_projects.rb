class AddShortnameToProjects < ActiveRecord::Migration
  def self.up
    add_column :projects, :shortname, :string
 end

 def self.down
   remove_column :projects, :shortname
 end
end
