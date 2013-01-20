# Be sure to restart your server when you modify this file.

Basil::Application.config.session_store :cookie_store, :key => '_basil_session'

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rails generate session_migration")
# Basil::Application.config.session_store :active_record_store
