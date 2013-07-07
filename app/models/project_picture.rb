require 'uuidtools'

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

    bucket = s3.buckets[@@bucketName]
    obj = bucket.objects[@name]
    obj.write(:file => uploadedFile.tempfile)

    if !obj.exists?
      return {:error => "S3 file upload failed"}
    end

    obj.acl = :public_read

    return {:url => @@s3UrlBase + @@bucketName + "/" + @name}
  end

  def destroyS3Image
    ## Destroys the S3 image

    # Connect to S3
    @s3 = AWS::S3.new(
      :access_key_id => 'AKIAJJWMAR6C775ERHSA',
      :secret_access_key => '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')

    # Fetch object
    @bucket = @s3.buckets[@@bucketName]
    @objName = url.split("/" + @@bucketName + "/")[1]

    if !@objName
      return {:error => "File name parsing error"}
    end

    # Delete object
    @obj = @bucket.objects[@objName]
    @obj.delete

    if @obj.exists?
      return {:error => "S3 file deletion failed"}
    end

    return {:result => "Success"}
  end
end
