# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150507003139) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "uuid-ossp"
  enable_extension "cube"
  enable_extension "earthdistance"

  create_table "actors", id: false, force: true do |t|
    t.string  "name",    limit: 50
    t.string  "country", limit: 50
    t.integer "salary"
    t.string  "role",    limit: 50
  end

  create_table "games", force: true do |t|
    t.string   "name"
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "movies", force: true do |t|
    t.string  "title",    limit: 50
    t.integer "duration"
  end

  create_table "test", force: true do |t|
    t.string  "title",    limit: 50
    t.integer "movie_id"
  end

  create_table "userpeople", id: false, force: true do |t|
    t.integer "id"
    t.string  "username", limit: 50
  end

end
