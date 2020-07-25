# -*- coding: utf-8 -*-
# This is an automatically generated file used to store
# BotPasswords.
#
# As a simpler (but less secure) alternative to OAuth, MediaWiki allows bot
# users to uses BotPasswords to limit the permissions given to a bot.
# When using BotPasswords, each instance gets keys. This combination can only
# access the API, not the normal web interface.
#
# See https://www.mediawiki.org/wiki/Manual:Pywikibot/BotPasswords for more
# information.
from __future__ import absolute_import, division, unicode_literals
import os

BOT_USER= os.environ.get('BOT_USER') 
BOT_PASS= os.environ.get('BOT_PASS') 
(BOT_USER, BotPassword('CyclingInitBot', BOT_PASS))
