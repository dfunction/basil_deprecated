require 'test_helper'

class HomeControllerTest < ActionController::TestCase
  test "should get render" do
    get :render
    assert_response :success
  end

end
