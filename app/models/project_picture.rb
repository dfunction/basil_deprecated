require 'UUIDTools'

class ProjectPicture < ActiveRecord::Base
  attr_accessible :project, :url, :is_thumb
  belongs_to :project

  @@bucketName = "basil_dev"
  @@s3UrlBase = "https://s3.amazonaws.com/"

  def getS3Url(uploadedFile)
    # Create filename
    @name = UUIDTools::UUID.random_create.to_s

    # Connect to S3 & Upload file
    s3 = AWS::S3.new(
      :access_key_id => 'AKIAJJWMAR6C775ERHSA',
      :secret_access_key => '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')

    bucket = s3.buckets['basil_dev']
    obj = bucket.objects[@name]
    obj.write(:file => uploadedFile.tempfile)

    if !obj.exists?
      return {:error => "S3 file upload failed"}
    end

    obj.acl = :public_read

    return {:url => @@s3UrlBase + @@bucketName + "/" + @name}
  end
end
