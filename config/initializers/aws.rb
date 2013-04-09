# Connect to AWS at begining
Basil::Application.config.after_initialize do
  AWS::S3::Base.establish_connection!(
      :access_key_id     => 'AKIAJJWMAR6C775ERHSA',
      :secret_access_key => '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'
    )
end