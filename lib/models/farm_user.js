'use strict'
// external modules
var fs = require('fs')
var path = require('path')
var cheerio = require('cheerio')
var Sequelize = require('sequelize')
var async = require('async')
var moment = require('moment')
var DiffMatchPatch = require('diff-match-patch')
var dmp = new DiffMatchPatch()
var S = require('string')

// core
var config = require('../config.js')
var logger = require('../logger.js')

// ot
var ot = require('../ot/index.js')


module.exports = function (sequelize, DataTypes) {
  var FarmUser = sequelize.define('FarmUser', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      defaultValue: 0
    },
    farmId: {
      type: DataTypes.INTEGER,
      get: function () {
        return sequelize.processData(this.getDataValue('name'), '')
      },
      set: function (value) {
        this.setDataValue('name', sequelize.stripNullByte(value))
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      get: function () {
        return sequelize.processData(this.getDataValue('name'), '')
      },
      set: function (value) {
        this.setDataValue('name', sequelize.stripNullByte(value))
      }
    },
    lastchangeAt: {
      type: DataTypes.DATE
    },
    savedAt: {
      type: DataTypes.DATE
    }
  }, {
    paranoid: true,
    indexes: [
      {
          unique:true,
          fields: ['farmId', 'userId'],
      }
    ],
    classMethods: {
      associate: function (models) {
        FarmUser.belongsTo(models.User, {
          foreignKey: 'userId',
          as: 'owner',
          constraints: false
        })
      }
    }
  })
  return FarmUser
}
