require 'test_helper'

class ProjectControllerTest < ActionController::TestCase
  test "should get rasterizeAll" do
    get :rasterizeAll
    assert_response :success
  end

end
