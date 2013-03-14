require 'test_helper'

class HomeControllerTest < ActionController::TestCase
  test "should get rasterize" do
    get :rasterize
    assert_response :success
  end

end
