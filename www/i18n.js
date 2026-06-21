// ═══════════════════════════════════════════════════════════════════
// i18n.js — Internazionalizzazione / Internationalisation
// CourtStats — Supporto Italiano / English
//
// Uso / Usage:
//   t('key')          → stringa nella lingua corrente
//   t('key', {n:5})   → interpolazione: sostituisce {n} con 5
//   setLanguage('en') → cambia lingua e ricarica l'interfaccia
//   getLang()         → 'it' | 'en'
// ═══════════════════════════════════════════════════════════════════

const STRINGS = {

// ── DISCLAIMER / TERMINI DI UTILIZZO ─────────────────────────────
  disclaimer_title:                    { it: 'Termini di utilizzo e Privacy',             en: 'Terms of Use and Privacy'                   },
  disclaimer_subtitle:                 { it: 'Leggi attentamente prima di continuare',    en: 'Please read carefully before continuing'     },

  disclaimer_section_use_title:        { it: "1. Finalità dell'app",                      en: '1. Purpose of the app'                       },
  disclaimer_section_use_body:         { it: "CourtStats è uno strumento amatoriale per registrare e visualizzare statistiche di partite di basket (tiri, falli, minutaggio, ecc.). I dati e i report generati sono forniti \"così come sono\", a scopo informativo e ricreativo, senza alcuna garanzia di accuratezza, completezza o idoneità per un uso ufficiale, agonistico o professionale.",
                                         en: "CourtStats is an amateur tool for recording and viewing basketball game statistics (shots, fouls, playing time, etc.). The data and reports generated are provided \"as is\", for informational and recreational purposes only, with no guarantee of accuracy, completeness, or suitability for official, competitive, or professional use." },

  disclaimer_section_liability_title:  { it: '2. Limitazione di responsabilità',          en: '2. Limitation of liability'                  },
  disclaimer_section_liability_body:   { it: "L'app viene fornita gratuitamente \"as is\" e \"as available\", senza garanzie di alcun tipo, esplicite o implicite. L'autore/sviluppatore declina ogni responsabilità per errori nei dati, perdita di informazioni, malfunzionamenti, interruzioni del servizio o qualsiasi danno diretto, indiretto, incidentale o consequenziale derivante dall'uso o dall'impossibilità di utilizzare l'applicazione. L'utente utilizza l'app a proprio rischio e sotto la propria responsabilità.",
                                         en: "The app is provided free of charge \"as is\" and \"as available\", without warranties of any kind, express or implied. The author/developer disclaims any liability for data errors, loss of information, malfunctions, service interruptions, or any direct, indirect, incidental, or consequential damages arising from the use or inability to use the application. You use the app at your own risk and responsibility." },

  disclaimer_section_data_title:       { it: '3. Dati e archiviazione',                   en: '3. Data and storage'                         },
  disclaimer_section_data_body:        { it: "I dati inseriti (rose, partite, statistiche, impostazioni) sono memorizzati localmente sul dispositivo dell'utente (localStorage del browser) in forma cifrata. L'autore non ha accesso a tali dati e non li raccoglie su server propri. Se l'utente attiva volontariamente l'integrazione con Google Drive, i dati selezionati verranno sincronizzati con l'account Google personale dell'utente, secondo i termini e le policy privacy di Google. La cancellazione dei dati del browser o la disinstallazione potrebbero comportare la perdita permanente dei dati salvati localmente: si consiglia di effettuare backup periodici tramite la funzione di esportazione, se disponibile.",
                                         en: "The data you enter (rosters, matches, statistics, settings) is stored locally on your device (browser localStorage) in encrypted form. The author has no access to this data and does not collect it on any server. If you voluntarily enable Google Drive integration, the selected data will be synced to your personal Google account, subject to Google's own terms and privacy policies. Clearing your browser data or uninstalling the app may permanently delete locally stored data: periodic backups via the export feature, where available, are recommended." },

  disclaimer_section_ads_title:        { it: '4. Pubblicità e cookie/tecnologie simili',  en: '4. Advertising and cookies/similar technologies' },
  disclaimer_section_ads_body:         { it: "Questa app può mostrare annunci pubblicitari forniti da Google AdSense (Google Ireland Limited). Google e i suoi partner pubblicitari possono utilizzare cookie, identificatori del dispositivo e tecnologie simili per mostrare annunci basati sulle visite precedenti dell'utente a questo o ad altri siti, in conformità con le proprie policy. L'utente può gestire le preferenze sugli annunci personalizzati visitando le impostazioni annunci di Google (adssettings.google.com) o www.aboutads.info. Continuando a utilizzare l'app, l'utente acconsente all'utilizzo di tali tecnologie da parte di Google nei limiti consentiti dalla normativa applicabile.",
                                         en: "This app may display advertisements provided by Google AdSense (Google Ireland Limited). Google and its advertising partners may use cookies, device identifiers, and similar technologies to show ads based on your prior visits to this or other sites, in accordance with their own policies. You can manage personalized ad preferences by visiting Google's ad settings (adssettings.google.com) or www.aboutads.info. By continuing to use the app, you consent to the use of these technologies by Google to the extent permitted by applicable law." },

  disclaimer_section_minors_title:     { it: '5. Età minima',                              en: '5. Minimum age'                              },
  disclaimer_section_minors_body:      { it: "L'app non è destinata a raccogliere consapevolmente dati personali di minori in violazione delle normative applicabili. L'uso da parte di minori dovrebbe avvenire sotto la supervisione di un genitore o tutore.",
                                         en: "The app is not intended to knowingly collect personal data from minors in violation of applicable regulations. Use by minors should be supervised by a parent or guardian." },

  disclaimer_section_changes_title:    { it: '6. Modifiche',                               en: '6. Changes'                                  },
  disclaimer_section_changes_body:     { it: "I presenti termini possono essere aggiornati in qualsiasi momento. L'uso continuato dell'app dopo una modifica costituisce accettazione dei nuovi termini. Proseguendo e premendo \"Accetto\", l'utente dichiara di aver letto, compreso e accettato integralmente quanto sopra.",
                                         en: "These terms may be updated at any time. Continued use of the app after a change constitutes acceptance of the new terms. By proceeding and pressing \"Accept\", you confirm that you have read, understood, and fully accepted the above." },

  disclaimer_accept_btn:               { it: 'Accetto',                                    en: 'Accept'                                      },




  // ─── NAVIGAZIONE ─────────────────────────────────────────────────
  'nav.roster':   { it: 'Roster',   en: 'Roster'   },
  'nav.matches':  { it: 'Partite',  en: 'Matches'  },
  'nav.live':     { it: 'Live',     en: 'Live'     },
  'nav.report':   { it: 'Report',   en: 'Report'   },
  'nav.settings': { it: 'Config',   en: 'Config'   },

  // ─── PAGINA ROSTER ───────────────────────────────────────────────
  'roster.title':          { it: 'ROSTER',              en: 'ROSTER'            },
  'roster.sub':            { it: 'Gestione giocatori',  en: 'Player management' },
  'roster.count':          { it: '{n} giocatori',       en: '{n} players'       },
  'roster.section':        { it: 'GIOCATORI',           en: 'PLAYERS'           },
  'roster.empty':          { it: 'Nessun giocatore nel roster',
                             en: 'No players in the roster'                      },
  'roster.add_btn':        { it: '＋ Aggiungi',         en: '＋ Add player'    },

  // ─── MODALE AGGIUNGI GIOCATORE ───────────────────────────────────
  'modal.addPlayer.title':       { it: 'AGGIUNGI GIOCATORE',  en: 'ADD PLAYER'          },
  'modal.addPlayer.name_label':  { it: 'COGNOME e NOME',      en: 'Full Name'           },
  'modal.addPlayer.name_ph':     { it: 'es. Rossi Mario',     en: 'e.g. Smith John'     },
  'modal.addPlayer.num_label':   { it: 'Numero',              en: 'Number'              },
  'modal.addPlayer.num_ph':      { it: 'es. 23',              en: 'e.g. 23'             },
  'modal.addPlayer.role_label':  { it: 'Ruolo',               en: 'Position'            },
  'modal.addPlayer.save_btn':    { it: 'Salva Giocatore',     en: 'Save Player'         },
  'modal.addPlayer.cancel_btn':  { it: 'Annulla',             en: 'Cancel'              },
  'modal.addPlayer.import':      { it: '  📂 Importa CSV',             en: '  📂 Import CSV'              },
  'modal.addPlayer.csvdesc':     { it: 'Cognome Nome,Numero,Ruolo - senza riga di intestazione',             en: 'Full Name,Number,Position - without header'              },

  // ─── PAGINA PARTITE ──────────────────────────────────────────────
  'matches.title':       { it: 'PARTITE',          en: 'MATCHES'           },
  'matches.sub':         { it: 'Storico partite',  en: 'Match history'     },
  'matches.new_btn':     { it: '＋ Nuova Partita', en: '＋ New Match'      },
  'matches.empty':       { it: 'Nessuna partita registrata',
                           en: 'No matches recorded'                        },
  'matches.home':        { it: 'Casa',    en: 'Home'  },
  'matches.away':        { it: 'Ospiti',  en: 'Away'  },
  'matches.status_live': { it: 'LIVE',    en: 'LIVE'  },
  'matches.status_done': { it: 'Chiusa',  en: 'Final' },
  'matches.open_btn':    { it: '▶ Apri', en: '▶ Open' },
  'matches.delete_btn':  { it: 'Elimina', en: 'Delete' },
  'matches.delete_disabled': { it: 'Chiudi il live per eliminare',
                               en: 'End live to delete'                     },

  // ─── MODALE NUOVA PARTITA ────────────────────────────────────────
  'modal.newMatch.title':       { it: 'NUOVA PARTITA',           en: 'NEW MATCH'             },
  'modal.newMatch.opp_label':   { it: 'Avversario',              en: 'Opponent'              },
  'modal.newMatch.opp_ph':      { it: 'es. Bulls Milano',        en: 'e.g. Chicago Bulls'    },
  'modal.newMatch.date_label':  { it: 'Data',                    en: 'Date'                  },
  'modal.newMatch.venue_label': { it: 'Casa/Ospiti',             en: 'Home/Away'             },
  'modal.newMatch.home_opt':    { it: 'Casa 🏠',                 en: 'Home 🏠'               },
  'modal.newMatch.away_opt':    { it: 'Ospiti ✈️',               en: 'Away ✈️'               },
  'modal.newMatch.qlen_label':  { it: 'Durata Quarto (min)',     en: 'Quarter Duration (min)'},
  'modal.newMatch.otlen_label': { it: 'Durata OT (min)',         en: 'OT Duration (min)'     },
  'modal.newMatch.roster_sect': { it: 'Convocati',               en: 'Active Roster'         },
  'modal.newMatch.create_btn':  { it: 'Crea e Vai Live',         en: 'Create & Go Live'      },
  'modal.newMatch.cancel_btn':  { it: 'Annulla',                 en: 'Cancel'                },

  // ─── PAGINA LIVE ─────────────────────────────────────────────────
  'live.title':               { it: 'LIVE',                    en: 'LIVE'                  },
  'live.no_match':            { it: 'Nessuna partita attiva',  en: 'No active match'       },
  'live.start_hint':          { it: 'Crea una nuova partita dalla sezione Partite.',
                                en: 'Create a new match from the Matches section.'         },
  'live.vs':                  { it: 'vs Avversario',           en: 'vs Opponent'           },
  'live.opponent_label':      { it: 'Avversario',              en: 'Opponent'              },
  'live.end_btn':             { it: 'Fine ›',                  en: 'End ›'                 },
  'live.rollback_btn':        { it: '↩',                       en: '↩'                     },
  'live.timer_start':         { it: '▶ Avvia',                 en: '▶ Start'               },
  'live.timer_pause':         { it: '⏸ Pausa',                 en: '⏸ Pause'              },
  'live.opp_roster_empty':    { it: 'Nessun giocatore aggiunto',            en: 'No players added'          },
  'live.opp_foul_empty':      { it: 'Nessun giocatore avversario aggiunto', en: 'No opponent players added' },
  'live.our_fouls':           { it: 'Ns Falli Q',              en: 'Our Fouls Q'           },
  'live.opp_fouls':           { it: 'Avv Falli Q',             en: 'Opp Fouls Q'           },
  'live.tab_stats':           { it: 'STATS',                   en: 'STATS'                 },
  'live.tab_log':             { it: 'LOG',                     en: 'LOG'                   },
  'live.tab_report':          { it: 'REPORT LIVE',             en: 'REPORT LIVE'           },
  'live.oncourt':             { it: 'IN CAMPO',                en: 'ON COURT'              },
  'live.section_shots':       { it: 'TIRI',                    en: 'SHOTS'                 },
  'live.section_rebounds':    { it: 'RIMBALZI',                en: 'REBOUNDS'              },
  'live.section_misc':        { it: 'ALTRO',                   en: 'OTHER'                 },
  'live.timeout_btn':         { it: 'TIMEOUT',                 en: 'TIMEOUT'               },
  'live.sub_btn':             { it: 'SUB',                     en: 'SUB'                   },
  'live.opp_btn':             { it: '👥 Avv.',                 en: '👥 Opp.'               },
  'live.setup_title':         { it: 'Partita creata. Inserisci il roster avversario e scegli il quintetto quando sei pronto.',
                                en: 'Match created. Add the opponent roster and choose your starting five when ready.' },
  'live.choose5_btn':         { it: '🏀 Scegli Quintetto e Inizia', en: '🏀 Choose Starting 5 & Start' },
  'live.opp_roster_btn':      { it: '👥 Roster Avversario',   en: '👥 Opponent Roster'    },

  // ─── ETICHETTE STATISTICHE (usate nel live e nel report) ─────────
  'stat.fg2m':          { it: '2Pt Dentro',      en: '2Pt Made'        },
  'stat.fg2a':          { it: '2Pt Fuori',        en: '2Pt Missed'      },
  'stat.fg3m':          { it: '3Pt Dentro',      en: '3Pt Made'        },
  'stat.fg3a':          { it: '3Pt Fuori',        en: '3Pt Missed'      },
  'stat.ftm':           { it: 'TL Dentro',        en: 'FT Made'         },
  'stat.fta':           { it: 'TL Fuori',         en: 'FT Missed'       },
  'stat.reb_off':       { it: 'Rimbalzo Off.',    en: 'Off. Rebound'    },
  'stat.reb_def':       { it: 'Rimbalzo Dif.',    en: 'Def. Rebound'    },
  'stat.assist':        { it: 'Assist',           en: 'Assist'          },
  'stat.steal':         { it: 'Palla Rubata',     en: 'Steal'           },
  'stat.turnover':      { it: 'Palla Persa',      en: 'Turnover'        },
  'stat.foul':          { it: 'Fallo Fatto',      en: 'Foul'            },
  'stat.foul_drawn':    { it: 'Fallo Subito',     en: 'Foul Drawn'      },
  'stat.block':         { it: 'Stoppata Fatta',   en: 'Block'           },
  'stat.block_against': { it: 'Stoppata Subita',  en: 'Block Against'   },

  // ─── ETICHETTE COLONNE TABELLA ───────────────────────────────────
  'col.player':   { it: 'Giocatore', en: 'Player'  },
  'col.pts':      { it: 'Pts',       en: 'Pts'     },
  'col.min':      { it: 'Min',       en: 'Min'     },
  'col.fg2':      { it: '2pt',       en: '2pt'     },
  'col.fg3':      { it: '3pt',       en: '3pt'     },
  'col.ft':       { it: 'TL',        en: 'FT'      },
  'col.reb_off':  { it: 'RO',        en: 'OR'      },
  'col.reb_def':  { it: 'RD',        en: 'DR'      },
  'col.ast':      { it: 'Ast',       en: 'Ast'     },
  'col.stl':      { it: 'PR',        en: 'Stl'     },
  'col.tov':      { it: 'PP',        en: 'Tov'     },
  'col.foul':     { it: 'FF',        en: 'Fls'     },
  'col.foul_drawn':{ it: 'FS',       en: 'FlsD'      },
  'col.block':     { it: 'SF',       en: 'Blk'           },
  'col.block_against': { it: 'SS',   en: 'BlkA'   },
  'col.quarter':  { it: 'Q',         en: 'Q'       },


  // ─── MODALE QUINTETTO ────────────────────────────────────────────
  'modal.starting5.title':  { it: 'QUINTETTO INIZIALE',
                              en: 'STARTING LINEUP'                              },
  'modal.starting5.hint':   { it: 'Seleziona esattamente 5 giocatori che iniziano in campo.',
                              en: 'Select exactly 5 players who start on court.' },
  'modal.starting5.start':  { it: '▶ Inizia Partita',    en: '▶ Start Match'   },
  'modal.starting5.skip':   { it: 'Salta — decido dopo', en: 'Skip — decide later' },

  // ─── MODALE SOSTITUZIONE ────────────────────────────────────────
  'modal.sub.title':        { it: 'SOSTITUZIONE',         en: 'SUBSTITUTION'    },
  'modal.sub.in_label':     { it: 'Entra',                en: 'In'              },
  'modal.sub.out_label':    { it: 'Esce',                 en: 'Out'             },
  'modal.sub.min_label':    { it: 'Min al termine',       en: 'Min remaining'   },
  'modal.sub.sec_label':    { it: 'Sec al termine',       en: 'Sec remaining'   },
  'modal.sub.min_ph':       { it: 'es. 3',                en: 'e.g. 3'          },
  'modal.sub.sec_ph':       { it: 'es. 20',               en: 'e.g. 20'         },
  'modal.sub.confirm':      { it: 'Conferma Sostituzione',en: 'Confirm Sub'     },
  'modal.sub.cancel':       { it: 'Annulla',              en: 'Cancel'          },

  // ─── MODALE FINE PERIODO ─────────────────────────────────────────
  'modal.period.title':     { it: 'FINE PERIODO',         en: 'END OF PERIOD'   },
  'modal.period.body':      { it: 'Cosa vuoi fare?',      en: 'What do you want to do?' },
  'modal.period.continue':  { it: 'Continua',             en: 'Continue'        },
  'modal.period.end_match': { it: 'Chiudi Partita',       en: 'End Match'       },
  'modal.period.cancel':    { it: 'Annulla',              en: 'Cancel'          },

  // ─── MODALE TIMEOUT ──────────────────────────────────────────────
  'modal.timeout.title':    { it: 'TIMEOUT',              en: 'TIMEOUT'         },
  'modal.timeout.our':      { it: 'Nostro Timeout',       en: 'Our Timeout'     },
  'modal.timeout.cancel':   { it: 'Annulla',              en: 'Cancel'          },

  // ─── MODALE ROLLBACK ─────────────────────────────────────────────
  'modal.rollback.title':   { it: 'ANNULLA AZIONE',       en: 'UNDO ACTION'     },
  'modal.rollback.confirm': { it: 'Annulla ultima azione',en: 'Undo last action'},
  'modal.rollback.cancel':  { it: 'Indietro',             en: 'Back'            },

  // ─── MODALE ROSTER AVVERSARIO ────────────────────────────────────
  'modal.oppRoster.title':  { it: '👥 ROSTER AVVERSARIO',  en: '👥 OPPONENT ROSTER'           },
  'modal.oppRoster.hint':   { it: 'Aggiungi i numeri degli avversari per tracciare i loro falli.',
                              en: 'Add opponent numbers to track their fouls.'                  },
  'modal.oppRoster.num_ph': { it: 'Numero',               en: 'Number'                         },
  'modal.oppRoster.name_ph':{ it: 'Nome (opzionale)',     en: 'Name (optional)'                },
  'modal.oppRoster.close':  { it: 'Chiudi',               en: 'Close'                          },

  // ─── MODALE FALLO AVVERSARIO ─────────────────────────────────────
  'modal.oppFoul.title':    { it: '✋ FALLO AVVERSARIO',   en: '✋ OPPONENT FOUL'  },
  'modal.oppFoul.subtitle': { it: 'Chi ha commesso il fallo?', en: 'Who committed the foul?' },
  'modal.oppFoul.cancel':   { it: 'Annulla',              en: 'Cancel'            },

  // ─── MODALE ELIMINA PARTITA ──────────────────────────────────────
  'modal.deleteMatch.title':   { it: '🗑 ELIMINA PARTITA',  en: '🗑 DELETE MATCH'              },
  'modal.deleteMatch.warning': { it: '⚠️ Questa azione non può essere annullata.',
                                 en: '⚠️ This action cannot be undone.'                        },
  'modal.deleteMatch.confirm': { it: 'Elimina definitivamente', en: 'Delete permanently'      },
  'modal.deleteMatch.cancel':  { it: 'Annulla',               en: 'Cancel'                    },

  // ─── MODALE MODIFICA TIMER ───────────────────────────────────────
  'modal.timerEdit.title':   { it: '✏️ MODIFICA TIMER',     en: '✏️ EDIT TIMER'               },
  'modal.timerEdit.hint':    { it: 'Inserisci il tempo rimanente nel quarto',
                               en: 'Enter the remaining time in the quarter'                   },
  'modal.timerEdit.min':     { it: 'Minuti',               en: 'Minutes'                      },
  'modal.timerEdit.sec':     { it: 'Secondi',              en: 'Seconds'                      },
  'modal.timerEdit.confirm': { it: '✓ Aggiorna Timer',     en: '✓ Update Timer'               },
  'modal.timerEdit.cancel':  { it: 'Annulla',              en: 'Cancel'                       },

  // ─── PAGINA REPORT ───────────────────────────────────────────────
  'report.title':             { it: 'REPORT',              en: 'REPORT'          },
  'report.sub':               { it: 'Statistiche partite', en: 'Match statistics'},
  'report.select_match':      { it: '— Seleziona partita —', en: '— Select match —' },
  'report.no_matches':        { it: 'Nessuna partita disponibile',
                                en: 'No matches available'                        },
  'report.export_btn':        { it: '📤 Esporta',          en: '📤 Export'       },
  'report.all_periods':       { it: 'Tutti i periodi',     en: 'All periods'     },
  'report.shot_map':          { it: 'MAPPA TIRI',          en: 'SHOT MAP'        },
  'report.zoom_map':          { it: '🔍 Zoom mappa',       en: '🔍 Zoom map'     },

  // ─── PAGINA CONFIG ───────────────────────────────────────────────
  'settings.title':              { it: 'CONFIGURAZIONE',   en: 'SETTINGS'        },
  'settings.sub':                { it: 'Configurazione app',   en: 'App settings' },

  'settings.lang.title':         { it: '🌐 Lingua / Language',
                                   en: '🌐 Lingua / Language'                     },
  'settings.lang.desc':          { it: 'Scegli la lingua dell\'interfaccia.',
                                   en: 'Choose the interface language.'            },

  'settings.zone.title':         { it: '🎯 Selezione zona tiro',
                                   en: '🎯 Shot zone selection'                   },
  'settings.zone.desc':          { it: 'Se abilitata, dopo ogni tiro verrà mostrata la mappa del campo per selezionare la zona precisa. Se disabilitata, i punti vengono registrati immediatamente senza aprire la mappa.',
                                   en: 'When enabled, the court map is shown after each shot to select the exact zone. When disabled, points are recorded immediately without opening the map.' },
  'settings.zone.on':            { it: 'Abilitata — la mappa viene mostrata dopo ogni tiro',
                                   en: 'Enabled — the map is shown after each shot'           },
  'settings.zone.off':           { it: 'Disabilitata — i punti vengono registrati immediatamente',
                                   en: 'Disabled — points are recorded immediately'           },

  'settings.oppRoster.title':    { it: '👥 Roster avversario',
                                   en: '👥 Opponent roster'                       },
  'settings.oppRoster.desc':     { it: 'Se abilitata, quando si registra un fallo subito viene aperta la modale per assegnare il fallo a un giocatore avversario. Se disabilitata, il fallo subito viene registrato immediatamente senza aprire nessuna modale.',
                                   en: 'When enabled, recording a drawn foul opens the modal to assign the foul to an opponent player. When disabled, the drawn foul is recorded immediately without any modal.' },
  'settings.oppRoster.on':       { it: 'Abilitata — la modale avversario si apre al fallo subito',
                                   en: 'Enabled — opponent modal opens on drawn foul'         },
  'settings.oppRoster.off':      { it: 'Disabilitata — il fallo subito viene registrato senza modale',
                                   en: 'Disabled — drawn foul recorded without modal'         },

  'settings.export.title':       { it: '📤 Export report',  en: '📤 Export report' },
  'settings.export.desc':        { it: 'Se abilitata, il pulsante di esportazione del report è disponibile nella sezione Report. Se disabilitata, il pulsante viene nascosto e non è possibile esportare i dati.',
                                   en: 'When enabled, the export button is available in the Report section. When disabled, the button is hidden and data cannot be exported.' },
  'settings.export.on':          { it: 'Abilitata — il pulsante export è visibile nel report',
                                   en: 'Enabled — export button visible in report'            },
  'settings.export.off':         { it: 'Disabilitata — il pulsante export è nascosto',
                                   en: 'Disabled — export button is hidden'                   },

  'settings.drive.title':        { it: '☁️ Sincronizzazione Google Drive',
                                   en: '☁️ Google Drive Sync'                     },
  'settings.drive.desc':         { it: 'Se abilitata, i dati vengono sincronizzati automaticamente con Google Drive. Se disabilitata, l\'app funziona solo in locale e il pulsante Drive non viene mostrato.',
                                   en: 'When enabled, data is automatically synced with Google Drive. When disabled, the app works locally only and the Drive button is hidden.' },
  'settings.drive.on':           { it: 'Abilitata — i dati vengono sincronizzati con Google Drive',
                                   en: 'Enabled — data is synced with Google Drive'           },
  'settings.drive.off':          { it: 'Disabilitata — l\'app funziona solo in locale',
                                   en: 'Disabled — app works locally only'                    },
  'settings.drive.clientid_label':{ it: 'Google OAuth Client ID',
                                    en: 'Google OAuth Client ID'                              },
  'settings.drive.save_btn':     { it: '💾 Salva',           en: '💾 Save'         },
  'settings.drive.clientid_hint':{ it: 'Il Client ID si ottiene dalla',
                                   en: 'The Client ID is obtained from the'                   },
  'settings.drive.clientid_link':{ it: 'Google Cloud Console',
                                   en: 'Google Cloud Console'                                 },
  'settings.drive.clientid_hint2':{ it: '. Viene salvato solo sul tuo dispositivo e non è incluso nel codice sorgente.',
                                    en: '. It is saved only on your device and is not included in the source code.' },
  'settings.drive.connect_btn':  { it: '☁ Connetti a Google Drive',
                                   en: '☁ Connect to Google Drive'                           },
  'settings.drive.connected_btn':{ it: '✓ Drive connesso — Disconnetti',
                                   en: '✓ Drive connected — Disconnect'                       },
  'settings.drive.sync_active':  { it: 'Sincronizzazione attiva',
                                   en: 'Sync active'                                          },
  'settings.drive.clientid_saved':{ it: '✅ Client ID salvato sul dispositivo',
                                    en: '✅ Client ID saved on device'                        },
  'settings.drive.clientid_removed':{ it: 'Client ID rimosso', en: 'Client ID removed'      },

  'settings.logo.title':         { it: '🖼️ Logo squadra',    en: '🖼️ Team logo'    },
  'settings.logo.desc':          { it: 'Carica un logo personalizzato (PNG, JPG, max 2 MB). Verrà mostrato in alto al centro nelle pagine Roster, Partite e Report.',
                                   en: 'Upload a custom logo (PNG, JPG, max 2 MB). It will be shown at the top of the Roster, Matches and Report pages.' },
  'settings.logo.choose_btn':    { it: '📂 Scegli immagine', en: '📂 Select image'  },
  'settings.logo.remove_btn':    { it: '🗑️ Rimuovi logo',    en: '🗑️ Remove logo'  },
  'settings.footer':             { it: 'ℹ️ Le impostazioni vengono salvate localmente sul dispositivo. La disabilitazione della mappa e del roster avversario velocizzano la registrazione delle statistiche durante la partita.',
                                   en: 'ℹ️ Settings are saved locally on the device. Disabling the shot map and opponent roster speeds up stat recording during a match.' },

  // ─── DRIVE STATUS BAR ────────────────────────────────────────────
  'drive.status_bar_disconnect': { it: 'Disconnetti',       en: 'Disconnect'      },
  'drive.active':                { it: 'Google Drive attivo', en: 'Google Drive active' },
  'drive.syncing':               { it: 'Sincronizzazione…', en: 'Syncing…'        },
  'drive.sync_error':            { it: '⚠️ Errore sync',    en: '⚠️ Sync error'   },
  'drive.synced_at':             { it: 'Sincronizzato alle {h}:{m}',
                                   en: 'Synced at {h}:{m}'                         },
  'drive.not_connected':         { it: 'Non connesso',      en: 'Not connected'   },


  // ─── MAPPA TIRI — selezione ────────────────────────────────────────
  'report.tab.precise_shots': { it: '📍 Tiri Precisi', en: '📍 Precise Shots' },
  'report.tab.zone_bubbles':  { it: '🫧 Bolle per Zona',   en: '🫧 Zone Bubbles' },

  // ─── MAPPA TIRI — legenda ────────────────────────────────────────
  'court.title':    { it: 'Seleziona zona del campo',   en: 'Shot zone selection'   },
  'court.made':    { it: 'Segnato',   en: 'Made'   },
  'court.missed':  { it: 'Sbagliato', en: 'Missed' },
  'court.cancel':  { it: 'Annulla',   en: 'Cancel' },
  'court.zone_disabled': { it: '⚙️ Selezione zona disabilitata nelle impostazioni',
                           en: '⚙️ Shot zone selection disabled in settings'       },
  'court.title_shot':    { it: 'REGISTRA TIRO', en: 'RECORD SHOT'                 },
  'court.type_2pt':      { it: '2 PUNTI',       en: '2 POINTS'                    },
  'court.type_3pt':      { it: '3 PUNTI',       en: '3 POINTS'                    },
  'shotmap.bubble.legend':    { it: 'Dimensione proporzionale al numero di tiri',       en: 'Size proportional to the number of shots'  },
  'shotmap.bubble.gradient':  { it: 'Percentuale di realizzazione 0%->100%',                                         en: 'Realization percentage 0%->100%'                                  },
  'report.shotmap.zoom_hint': { it: 'Doppio tap per ingrandire',                        en: 'Double tap to zoom'                        },

  // ─── ZONE DEL CAMPO ──────────────────────────────────────────────
  // Formato: chiave = 'zone.' + nome-it-normalizzato
  // Il mapping italiano → traduzione inglese
  'zone.Top Ang.Sx':        { it: 'Top Ang.Sx',        en: 'Top Corner L'       },
  'zone.Top Sx':            { it: 'Top Sx',             en: 'Top Left'           },
  'zone.Top Cx-Sx':         { it: 'Top Cx-Sx',          en: 'Top Ctr-L'          },
  'zone.Top Cx-Dx':         { it: 'Top Cx-Dx',          en: 'Top Ctr-R'          },
  'zone.Top Dx':            { it: 'Top Dx',             en: 'Top Right'          },
  'zone.Top Ang.Dx':        { it: 'Top Ang.Dx',         en: 'Top Corner R'       },
  'zone.Ala Sx':            { it: 'Ala Sx',             en: 'Left Wing'          },
  'zone.Alto Sx':           { it: 'Alto Sx',            en: 'High Left'          },
  'zone.Alto Cx-Sx':        { it: 'Alto Cx-Sx',         en: 'High Ctr-L'         },
  'zone.Alto Cx-Dx':        { it: 'Alto Cx-Dx',         en: 'High Ctr-R'         },
  'zone.Alto Dx':           { it: 'Alto Dx',            en: 'High Right'         },
  'zone.Ala Dx':            { it: 'Ala Dx',             en: 'Right Wing'         },
  'zone.Angolo Sx Mid':     { it: 'Angolo Sx Mid',      en: 'Left Corner Mid'    },
  'zone.Mid Est Sx':        { it: 'Mid Est Sx',         en: 'Mid Ext Left'       },
  'zone.Mid Sx':            { it: 'Mid Sx',             en: 'Mid Left'           },
  'zone.Mid Cx-Sx':         { it: 'Mid Cx-Sx',          en: 'Mid Ctr-L'          },
  'zone.Mid Cx-Dx':         { it: 'Mid Cx-Dx',          en: 'Mid Ctr-R'          },
  'zone.Mid Dx':            { it: 'Mid Dx',             en: 'Mid Right'          },
  'zone.Mid Est Dx':        { it: 'Mid Est Dx',         en: 'Mid Ext Right'      },
  'zone.Angolo Dx Mid':     { it: 'Angolo Dx Mid',      en: 'Right Corner Mid'   },
  'zone.Angolo Sx Basso':   { it: 'Angolo Sx Basso',    en: 'Left Corner Low'    },
  'zone.Base Est Sx':       { it: 'Base Est Sx',        en: 'Baseline Ext Left'  },
  'zone.Baseline Sx':       { it: 'Baseline Sx',        en: 'Baseline Left'      },
  'zone.Paint Basso Sx':    { it: 'Paint Basso Sx',     en: 'Low Post Left'      },
  'zone.Canestro':          { it: 'Canestro',           en: 'Paint / Basket'     },
  'zone.Paint Basso Dx':    { it: 'Paint Basso Dx',     en: 'Low Post Right'     },
  'zone.Baseline Dx':       { it: 'Baseline Dx',        en: 'Baseline Right'     },
  'zone.Angolo Dx Basso':   { it: 'Angolo Dx Basso',    en: 'Right Corner Low'   },

  // ─── ZOOM MAP ────────────────────────────────────────────────────
  'zoommap.title':   { it: 'Mappa Tiri',  en: 'Shot Map'  },
  'zoommap.close':   { it: '✕ Chiudi',   en: '✕ Close'   },

  // ─── PLAYER DETAIL MODAL ─────────────────────────────────────────
  'player.close':         { it: '✕ Chiudi',          en: '✕ Close'            },
  'player.pts':           { it: 'Punti',              en: 'Points'             },
  'player.min':           { it: 'Minuti',             en: 'Minutes'            },
  'player.reb':           { it: 'Rimbalzi',           en: 'Rebounds'           },
  'player.ast':           { it: 'Assist',             en: 'Assists'            },
  'player.stl':           { it: 'Rubate',             en: 'Steals'             },
  'player.fls':           { it: 'Falli',              en: 'Fouls'              },
  'player.shots_section': { it: 'Tiri',               en: 'Shooting'           },
  'player.2pt':           { it: '2 Punti',            en: '2 Points'           },
  'player.3pt':           { it: '3 Punti',            en: '3 Points'           },
  'player.ft':            { it: 'Liberi',             en: 'Free Throws'        },
  'player.per_quarter':   { it: 'PER QUARTO',         en: 'PER QUARTER'        },
  'player.all_periods':   { it: 'Tutti i periodi',    en: 'All periods'        },
  'player.shot_map':      { it: 'MAPPA TIRI',         en: 'SHOT MAP'           },

  // ─── TOAST / MESSAGGI ────────────────────────────────────────────
  'toast.select_player':       { it: 'Seleziona un giocatore',
                                 en: 'Select a player'                           },
  'toast.no_undo':             { it: 'Nessuna azione da annullare',
                                 en: 'Nothing to undo'                           },
  'toast.undo_done':           { it: 'Azione annullata ↩',
                                 en: 'Action undone ↩'                          },
  'toast.action_removed':      { it: 'Azione rimossa e annullata ✓',
                                 en: 'Action removed and undone ✓'              },
  'toast.shot_made':           { it: '✅ {name}: +{pts} pts! (tot. {total})',
                                 en: '✅ {name}: +{pts} pts! (tot. {total})'    },
  'toast.shot_missed':         { it: '❌ {name}: Sbagliato',
                                 en: '❌ {name}: Missed'                         },
  'toast.ft_made':             { it: '🎯 {name}: Tiro Libero Segnato +1 (tot. {total})',
                                 en: '🎯 {name}: Free Throw Made +1 (tot. {total})' },
  'toast.ft_missed':           { it: '⭕ {name}: Tiro Libero Sbagliato',
                                 en: '⭕ {name}: Free Throw Missed'              },
  'toast.foul':                { it: '✋ {name}: {n} {label}{warn}',
                                 en: '✋ {name}: {n} {label}{warn}'             },
  'toast.foul_singular':       { it: 'fallo',  en: 'foul'  },
  'toast.foul_plural':         { it: 'falli',  en: 'fouls' },
  'toast.foul_warn4':          { it: ' — ATTENZIONE!', en: ' — WATCH OUT!'      },
  'toast.foul_warn5':          { it: ' — FUORI!',      en: ' — FOULED OUT!'     },
  'toast.add_opp_hint':        { it: '💡 Aggiungi il roster avversario per assegnare il fallo (tasto 👥 Avv.)',
                                 en: '💡 Add the opponent roster to assign the foul (👥 Opp. button)' },
  'toast.foul_drawn_direct':   { it: '🙋 Fallo subito registrato',
                                 en: '🙋 Drawn foul recorded'                   },
  'toast.opp_foul':            { it: 'Fallo #{num}: {total}F{warn}',
                                 en: 'Foul #{num}: {total}F{warn}'              },
  'toast.sub':                 { it: 'Sub: {in} ↔ {out}',
                                 en: 'Sub: {in} ↔ {out}'                        },
  'toast.no_bench':            { it: 'Nessun giocatore in panchina',
                                 en: 'No players on the bench'                  },
  'toast.period_started':      { it: '{period} iniziato',
                                 en: '{period} started'                         },
  'toast.match_ended':         { it: 'Partita terminata ✓',
                                 en: 'Match ended ✓'                            },
  'toast.timeout_exhausted':   { it: 'Timeout esauriti per questo periodo!',
                                 en: 'No more timeouts for this period!'         },
  'toast.timeout_recorded':    { it: 'Timeout registrato ({used}/{limit} {half})',
                                 en: 'Timeout recorded ({used}/{limit} {half})' },
  'toast.timer_expired':       { it: '⏱ Tempo scaduto!', en: '⏱ Time expired!'  },
  'toast.timer_updated':       { it: 'Timer aggiornato: {time}',
                                 en: 'Timer updated: {time}'                    },
  'toast.player_added':        { it: 'Giocatore aggiunto ✓', en: 'Player added ✓' },
  'toast.player_insert_num':      { it: 'Inserisci il numero',
                                     en: 'Enter jersey number'                     },
  'toast.add_opp_players_first':  { it: 'Aggiungi prima i giocatori avversari',
                                     en: 'Add opponent players first'              },
  'toast.player_insert_name_num': { it: 'Inserisci nome e numero',
                                    en: 'Enter name and number'                  },
  'toast.player_invalid_num':  { it: 'Numero non valido (0-999)',
                                 en: 'Invalid number (0-999)'                   },
  'toast.player_invalid_name': { it: 'Nome non valido', en: 'Invalid name'      },
  'toast.add_players_first':   { it: 'Aggiungi prima i giocatori al roster',
                                 en: 'Add players to the roster first'          },
  'toast.insert_opponent':     { it: 'Inserisci il nome dell\'avversario',
                                 en: 'Enter the opponent name'                  },
  'toast.select_5':            { it: 'Seleziona almeno 5 convocati',
                                 en: 'Select at least 5 players'                },
  'toast.max5':                { it: 'Massimo 5 giocatori', en: 'Maximum 5 players' },
  'toast.select_exactly5':     { it: 'Seleziona esattamente 5 giocatori',
                                 en: 'Select exactly 5 players'                 },
  'toast.match_deleted':       { it: 'Partita eliminata',  en: 'Match deleted'  },
  'toast.export_done':         { it: 'Report esportato ✓', en: 'Report exported ✓' },
  'toast.export_disabled':     { it: '⚙️ Export disabilitato nelle impostazioni',
                                 en: '⚙️ Export disabled in settings'           },
  'toast.select_match_first':  { it: 'Seleziona prima una partita',
                                 en: 'Select a match first'                     },
  'toast.logo_updated':        { it: '✅ Logo aggiornato!', en: '✅ Logo updated!' },
  'toast.logo_removed':        { it: '🗑️ Logo rimosso',    en: '🗑️ Logo removed' },
  'toast.logo_invalid':        { it: 'Seleziona un file immagine',
                                 en: 'Select an image file'                     },
  'toast.logo_too_large':      { it: 'Immagine troppo grande (max 2 MB)',
                                 en: 'Image too large (max 2 MB)'               },
  'toast.opp_insert_num':      { it: 'Inserisci il numero', en: 'Enter a number' },
  'toast.opp_invalid_num':     { it: 'Numero non valido (0-999)',
                                 en: 'Invalid number (0-999)'                   },
  'toast.opp_num_exists':      { it: 'Numero già presente', en: 'Number already exists' },
  'toast.opp_add_first':       { it: 'Aggiungi prima i giocatori avversari',
                                 en: 'Add opponent players first'               },
  'toast.opp_error':           { it: 'Errore: giocatore non trovato',
                                 en: 'Error: player not found'                  },
  'toast.action_not_found':    { it: 'Errore: azione non trovata',
                                 en: 'Error: action not found'                  },
  'toast.error_generic':       { it: 'Errore', en: 'Error'                      },
  'toast.zone_enabled':        { it: '🗺️ Selezione zona abilitata',
                                 en: '🗺️ Shot zone selection enabled'           },
  'toast.zone_disabled':       { it: '⚡ Selezione zona disabilitata',
                                 en: '⚡ Shot zone selection disabled'          },
  'toast.opp_roster_enabled':  { it: '👥 Roster avversario abilitato',
                                 en: '👥 Opponent roster enabled'               },
  'toast.opp_roster_disabled': { it: '⚡ Roster avversario disabilitato',
                                 en: '⚡ Opponent roster disabled'              },
  'toast.export_enabled':      { it: '📤 Export report abilitato',
                                 en: '📤 Export report enabled'                 },
  'toast.export_disabled2':    { it: '🔒 Export report disabilitato',
                                 en: '🔒 Export report disabled'                },
  'toast.drive_feature_on':    { it: '☁️ Sincronizzazione Drive abilitata',
                                 en: '☁️ Drive sync enabled'                    },
  'toast.drive_feature_off':   { it: '💾 Sincronizzazione Drive disabilitata',
                                 en: '💾 Drive sync disabled'                   },
  'toast.drive_connected':     { it: '✅ Connesso a Google Drive — dati al sicuro!',
                                 en: '✅ Connected to Google Drive — data is safe!' },
  'toast.drive_disconnected':  { it: 'Disconnesso da Google Drive',
                                 en: 'Disconnected from Google Drive'           },
  'toast.drive_session_expired':{ it: '⚠️ Sessione Drive scaduta — ripremi ☁ Drive per riconnetterti',
                                  en: '⚠️ Drive session expired — press ☁ Drive to reconnect' },
  'toast.drive_no_client_id':  { it: '⚠️ Inserisci il Client ID Google nelle impostazioni Drive',
                                 en: '⚠️ Enter the Google Client ID in Drive settings' },
  'toast.drive_no_client_id2': { it: '⚠️ Inserisci prima il Client ID Google nelle impostazioni Drive',
                                 en: '⚠️ Enter the Google Client ID in Drive settings first' },
  'toast.drive_sdk_loading':   { it: 'Google SDK non ancora caricato, riprova tra un secondo',
                                 en: 'Google SDK not yet loaded, try again in a second' },
  'toast.drive_auth_error':    { it: 'Errore autenticazione: {err}',
                                 en: 'Authentication error: {err}'              },
  'toast.drive_invalid_format':{ it: '⚠️ Formato non valido — deve terminare con .apps.googleusercontent.com',
                                 en: '⚠️ Invalid format — must end with .apps.googleusercontent.com' },
  'toast.lang_changed_it':     { it: '🇮🇹 Lingua impostata: Italiano',
                                 en: '🇮🇹 Language set: Italian'                },
  'toast.lang_changed_en':     { it: '🇬🇧 Language set: English',
                                 en: '🇬🇧 Language set: English'                },

  // ─── PERIODI / QUARTI ────────────────────────────────────────────
  'period.q':    { it: 'Q{n}',   en: 'Q{n}'  },
  'period.ot':   { it: 'OT{n}',  en: 'OT{n}' },
  'period.ot1':  { it: 'OT',     en: 'OT'    },
  'period.started': { it: '{p} iniziato',  en: '{p} started'  },

  // ─── FOUL WARNING ────────────────────────────────────────────────
  'foul.warn5':  { it: ' — FUORI!',     en: ' — FOULED OUT!'  },
  'foul.warn4':  { it: ' — ATTENZIONE!',en: ' — WATCH OUT!'   },
  'foul.opp_warn5': { it: ' — FUORI!',  en: ' — OUT!'         },
  'foul.opp_warn4': { it: ' — ATTENZIONE!', en: ' — WARNING!' },

  // ─── MISC ────────────────────────────────────────────────────────
  'misc.confirm_delete_match': { it: 'Vuoi eliminare la partita vs {opp} del {date}?',
                                 en: 'Delete the match vs {opp} on {date}?'     },
  'misc.close_live_to_delete': { it: 'Chiudi il live per eliminare',
                                 en: 'End live to delete'                        },
  'misc.halfLabel_1':          { it: '1°-2°Q', en: '1st-2ndQ' },
  'misc.halfLabel_2':          { it: '3°-4°Q', en: '3rd-4thQ' },

  // ─── LIVE: seleziona giocatore hint ──────────────────────────────
  'live.select_player_hint':   { it: '— seleziona —',            en: '— select —'               },

  // ─── LOG ─────────────────────────────────────────────────────────
  'log.empty':       { it: 'Nessuna azione',    en: 'No actions yet'  },
  'log.ft_made':     { it: 'TL segnato (+1)',   en: 'FT made (+1)'    },
  'log.ft_missed':   { it: 'TL sbagliato',      en: 'FT missed'       },
  'log.shot_made':   { it: 'Segnato',           en: 'Made'            },
  'log.shot_missed': { it: 'Sbagliato',         en: 'Missed'          },

  // ─── FOUL: singolare/plurale ─────────────────────────────────────
  'foul.singular': { it: 'fallo',  en: 'foul'  },
  'foul.plural':   { it: 'falli',  en: 'fouls' },

  // ─── MODAL FINE PERIODO ──────────────────────────────────────────
  'modal.nextPeriod.body_next': { it: 'Fine {lbl}. Avanza al quarto successivo o chiudi?',
                                   en: 'End of {lbl}. Go to next quarter or close?' },
  'modal.nextPeriod.body_end':  { it: 'Fine {lbl}. Chiudi la partita o aggiungi tempo supplementare?',
                                   en: 'End of {lbl}. Close the match or add overtime?' },
  'modal.nextPeriod.goto_q':    { it: '▶ Vai a Q{n}',          en: '▶ Go to Q{n}'          },
  'modal.nextPeriod.add_ot':    { it: '⏱ Tempo Supplementare', en: '⏱ Overtime'             },

  // ─── SETTINGS: label toggle ──────────────────────────────────────
  'settings.zone_on':          { it: 'Abilitata — la mappa viene mostrata dopo ogni tiro',
                                  en: 'Enabled — shot map shown after each shot'            },
  'settings.zone_off':         { it: 'Disabilitata — i punti vengono registrati immediatamente',
                                  en: 'Disabled — points recorded immediately'              },
  'settings.opp_roster_on':    { it: 'Abilitata — la modale avversario si apre al fallo subito',
                                  en: 'Enabled — opponent modal opens on foul drawn'        },
  'settings.opp_roster_off':   { it: 'Disabilitata — il fallo subito viene registrato senza modale',
                                  en: 'Disabled — foul drawn recorded without modal'        },
  'settings.export_on':        { it: 'Abilitata — il pulsante export è visibile nel report',
                                  en: 'Enabled — export button visible in report'           },
  'settings.export_off':       { it: 'Disabilitata — il pulsante export è nascosto',
                                  en: 'Disabled — export button hidden'                     },
  'settings.drive_on':         { it: 'Abilitata — i dati vengono sincronizzati con Google Drive',
                                  en: 'Enabled — data synced with Google Drive'             },
  'settings.drive_off':        { it: "Disabilitata — l'app funziona solo in locale",
                                  en: 'Disabled — app works locally only'                   },
  'settings.client_id_saved':  { it: '✅ Client ID salvato sul dispositivo',
                                  en: '✅ Client ID saved on device'                        },
  'settings.drive_connected_btn': { it: '✓ Drive connesso — Disconnetti',
                                     en: '✓ Drive connected — Disconnect'                   },
  'settings.drive_connect_btn':   { it: '☁ Connetti a Google Drive',
                                     en: '☁ Connect to Google Drive'                        },
  'settings.drive_syncing':       { it: 'Sincronizzazione attiva',
                                     en: 'Sync active'                                      },

  // ─── TOAST aggiuntivi ────────────────────────────────────────────
  'toast.add_player_first':      { it: 'Aggiungi prima i giocatori al roster',
                                    en: 'Add players to the roster first'                   },
  'toast.enter_opponent':        { it: "Inserisci il nome dell'avversario",
                                    en: 'Enter the opponent name'                           },
  'toast.select_5':              { it: 'Seleziona almeno 5 convocati',
                                    en: 'Select at least 5 players'                         },
  'toast.max_5':                 { it: 'Massimo 5 giocatori',
                                    en: 'Maximum 5 players'                                 },
  'toast.select_exactly_5':      { it: 'Seleziona esattamente 5 giocatori',
                                    en: 'Select exactly 5 players'                          },
  'toast.nothing_to_undo':       { it: 'Nessuna azione da annullare',
                                    en: 'Nothing to undo'                                   },
  'toast.action_undone':         { it: 'Azione annullata ↩',
                                    en: 'Action undone ↩'                                   },
  'toast.select_player':         { it: 'Seleziona un giocatore',
                                    en: 'Select a player'                                   },
  'toast.shot_made':             { it: '✅ {name}: +{pts} pts! (tot. {total})',
                                    en: '✅ {name}: +{pts} pts! (total {total})'            },
  'toast.shot_missed':           { it: '❌ {name}: Sbagliato',
                                    en: '❌ {name}: Missed'                                 },
  'toast.zone_na':               { it: 'zona non registrata',
                                    en: 'zone not recorded'                                 },
  'toast.ft_made':               { it: '🎯 {name}: Tiro Libero Segnato +1 (tot. {total})',
                                    en: '🎯 {name}: Free Throw Made +1 (total {total})'    },
  'toast.ft_missed':             { it: '⭕ {name}: Tiro Libero Sbagliato',
                                    en: '⭕ {name}: Free Throw Missed'                      },
  'toast.opp_add_first_hint':    { it: '💡 Aggiungi il roster avversario per assegnare il fallo (tasto 👥 Avv.)',
                                    en: '💡 Add opponent roster to assign the foul (👥 Opp. button)' },
  'toast.foul_drawn_recorded':   { it: '🙋 Fallo subito registrato',
                                    en: '🙋 Foul drawn recorded'                            },
  'toast.no_bench':              { it: 'Nessun giocatore in panchina',
                                    en: 'No players on the bench'                           },
  'toast.action_removed':        { it: 'Azione rimossa e annullata ✓',
                                    en: 'Action removed and undone ✓'                       },
  'toast.match_ended':           { it: 'Partita terminata ✓',
                                    en: 'Match ended ✓'                                     },

  // ─── ZOOM MAP / MODAL GENERICO ───────────────────────────────────
  'zoom.title':      { it: 'Mappa Tiri',  en: 'Shot Map'  },
  'zoom.close':      { it: '✕ Chiudi',   en: '✕ Close'   },
  'modal.close_btn': { it: '✕ Chiudi',   en: '✕ Close'   },

  // ─── EMPTY STATES & TESTI STATICI ───────────────────────────────
  'roster.empty_hint':    { it: 'Nessun giocatore.<br>Aggiungi il primo!',
                             en: 'No players yet.<br>Add the first one!'           },
  'matches.empty_hint':   { it: 'Nessuna partita registrata.',
                             en: 'No matches recorded.'                            },
  'live.no_match_hint':   { it: 'Nessuna partita in corso.<br>Vai su Partite e avvia una nuova gara.',
                             en: 'No match in progress.<br>Go to Matches and start a new game.' },
  'live.player_label':    { it: 'Giocatore:',    en: 'Player:'     },
  // ─── REPORT — section titles ──────────────────────────────────────
  'report.box_score':         { it: 'Box Score',            en: 'Box Score'            },
  'report.shot_summary':      { it: 'Sommario Tiri di Squadra', en: 'Team Shooting Summary' },
  'report.shot_fg':           { it: 'Dal campo (2pt+3pt)',   en: 'Field Goals (2pt+3pt)' },
  'report.shot_fg2':          { it: 'Tiri da 2',             en: '2-Point Shots'         },
  'report.shot_fg3':          { it: 'Tiri da 3',             en: '3-Point Shots'         },
  'report.shot_ft':           { it: 'Tiri Liberi',           en: 'Free Throws'           },
  'report.team_totals':       { it: 'Totali di Squadra',    en: 'Team Totals'          },
  'report.box_score_by_quarter': { it: 'Box Score per Quarto', en: 'Box Score by Quarter' },
  'report.shot_map':          { it: 'Mappa Tiri',           en: 'Shot Map'             },
  'report.opp_fouls':         { it: 'Falli Avversari',      en: 'Opponent Fouls'       },
  'report.detail_by_period':  { it: 'Dettaglio per Periodo',en: 'Period Breakdown'     },
  'report.substitutions':     { it: 'Sostituzioni',         en: 'Substitutions'        },
  'report.lineups':           { it: 'Quintetti',            en: 'Lineups'              },
  'report.by_quarter':        { it: 'Per Quarto',           en: 'By Quarter'           },
  'report.by_zone':           { it: 'Per Zona',             en: 'By Zone'              },
  'report.opp_foul_count':    { it: 'falli',                en: 'fouls'                },
  'report.game_flow':         { it: 'Flusso Partita',       en: 'Game Flow'            },
  'report.gf_us':             { it: 'Noi',                  en: 'Us'                   },
  'report.gf_max_lead':       { it: 'Vantaggio più ampio',  en: 'Biggest Lead'         },
  'report.gf_ties':           { it: 'Punteggio in parità',  en: 'Tied Score'           },
  'report.gf_lead_changes':   { it: 'Cambi vantaggio',      en: 'Lead Changes'         },
  'report.opp_foul_total':    { it: 'Totale falli avversari: <strong style="color:#f0eee8">{n}</strong>',
                                 en: 'Total opponent fouls: <strong style="color:#f0eee8">{n}</strong>' },
  'report.action.close':   { it: 'Chiudi',      en: 'Close'         },
  'match.result.win':  { it: 'VITTORIA', en: 'WIN' },
  'match.result.loss': { it: 'SCONFITTA', en: 'LOSS' },


  // ─── FILTERS ──────────────────────────────────────────────────────
  'filter.all_players':       { it: 'Tutta la squadra',     en: 'All players'          },
  'filter.all_periods':       { it: 'Tutti i periodi',      en: 'All periods'          },
  'filter.all': { it: 'TUTTI', en: 'ALL' },

  // ─── TIMEOUT MODAL ────────────────────────────────────────────────
  'timeout.overtime_unlimited': { it: 'Tempo supplementare: timeout illimitati',
                                   en: 'Overtime: unlimited timeouts'                  },
  'timeout.first_half_info':  { it: '1° e 2° quarto: {used} su 2 timeout usati ({remaining} rimasti)',
                                 en: '1st & 2nd quarter: {used} of 2 timeouts used ({remaining} left)' },
  'timeout.second_half_info': { it: '3° e 4° quarto: {used} su 3 timeout usati ({remaining} rimasti)',
                                 en: '3rd & 4th quarter: {used} of 3 timeouts used ({remaining} left)' },

  // ─── MISC ─────────────────────────────────────────────────────────
  'misc.zone_disabled':       { it: 'Selezione zona disabilitata nelle impostazioni',
                                 en: 'Zone selection disabled in settings'             },
  'stat.reb_tot_label':       { it: 'Rimbalzi Tot.',  en: 'Tot. Rebounds'             },

  // ─── NAVIGATION ───────────────────────────────────────────────────
  'nav.roster':           { it: 'Roster',    en: 'Roster'                          },
  'nav.matches':          { it: 'Partite',   en: 'Matches'                         },
  'nav.live':             { it: 'Live',      en: 'Live'                            },
  'nav.report':           { it: 'Report',    en: 'Report'                          },
  'nav.config':           { it: 'Config',    en: 'Settings'                        },

  // ─── MATCHES PAGE ─────────────────────────────────────────────────
  'matches.edit_btn':     { it: 'Modifica',  en: 'Edit'                            },

  // ─── EDIT MATCH MODAL ─────────────────────────────────────────────
  'edit.title':           { it: '✏️ MODIFICA PARTITA', en: '✏️ EDIT MATCH'         },
  'edit.quarter_label':   { it: 'Quarto',    en: 'Quarter'                         },
  'edit.player_label':    { it: 'Giocatore', en: 'Player'                          },
  'edit.tab_actions':     { it: 'Azioni',    en: 'Actions'                         },
  'edit.tab_log':         { it: 'Log',       en: 'Log'                             },
  'edit.section_shots':   { it: 'Tiri',      en: 'Shooting'                        },
  'edit.section_other':   { it: 'Rimbalzi & Altro', en: 'Rebounds & Other'         },
  'edit.timerEdit.min':     { it: 'Minut0',               en: 'Minute'                      },
  'edit.timerEdit.sec':     { it: 'SecondO',              en: 'Second'                      },

  // ─── STAT BUTTON SHORT LABELS ─────────────────────────────────────
  'stat.reb_off_short':         { it: 'Rimb. Off.',    en: 'Off. Reb.'             },
  'stat.reb_def_short':         { it: 'Rimb. Dif.',    en: 'Def. Reb.'             },
  'stat.foul_drawn_short':      { it: 'Fallo Subito',  en: 'Foul Drawn'            },
  'stat.steal_short':           { it: 'Palla Rubata',  en: 'Steal'                 },
  'stat.block_short':           { it: 'Stopp. Fatta',  en: 'Block'                 },
  'stat.foul_short':            { it: 'Fallo Fatto',   en: 'Foul'                  },
  'stat.turnover_short':        { it: 'Palla Persa',   en: 'Turnover'              },
  'stat.block_against_short':   { it: 'Stopp. Subita', en: 'Block Against'         },

  'modal.oppRoster.hint': { it: 'Aggiungi i numeri degli avversari per tracciare i loro falli.',
                             en: 'Add opponent numbers to track their fouls.'      },

  // ─── NUOVE CHIAVI — testi hardcodati convertiti ──────────────────
  // Setup screen meta
  'live.setup_meta':        { it: '{date} · {venue} · {n} convocati',
                               en: '{date} · {venue} · {n} selected'               },
  'live.setup_opp_roster':  { it: 'Roster Avversario ({n})',
                               en: 'Opponent Roster ({n})'                         },

  // Sostituzione — log entry
  'log.sub':                { it: 'Entra #{inNum} {inName} / Esce #{outNum} {outName} ({min}:{sec} al termine)',
                               en: 'In #{inNum} {inName} / Out #{outNum} {outName} ({min}:{sec} remaining)' },

 // REPORT SOSTITUZIONI
   'report.sub.quarter':                 { it: 'PERIODO',  en: 'PERIOD' },
   'report.sub.in':                      { it: 'ENTRA',  en: 'IN' },
   'report.sub.out':                     { it: 'ESCE',  en: 'OUT' },
   'report.sub.at_end':                  { it: 'AL TERMINE',  en: 'REMAINING' },

  // "al termine" nel report subs
  'misc.remaining':         { it: 'al termine', en: 'remaining'                    },

  // Court modal — tipo tiro con icona
  'court.label_made':       { it: '🟢 Segnato', en: '🟢 Made'                      },
  'court.label_missed':     { it: '🔴 Sbagliato', en: '🔴 Missed'                  },
  'court.type_2pt_label':   { it: '{result} — 2 Punti', en: '{result} — 2 Points'  },
  'court.type_3pt_label':   { it: '{result} — 3 Punti', en: '{result} — 3 Points'  },

  // Legenda shot map (testo semplice)
  'court.legend_made':      { it: 'Segnato',   en: 'Made'                          },
  'court.legend_missed':    { it: 'Sbagliato', en: 'Missed'                        },

  // Card statistiche live
  'stat.fouls_made_label':  { it: 'Falli Fatti',  en: 'Fouls Committed'            },
  'stat.fouls_drawn_label': { it: 'Falli Subiti', en: 'Fouls Drawn'                },

  // Player detail modal — pills
  'player.pts_label':       { it: 'Punti',     en: 'Points'                        },
  'player.min_label':       { it: 'Minuti',    en: 'Minutes'                       },
  'player.reb_label':       { it: 'Rimbalzi',  en: 'Rebounds'                      },
  'player.ast_label':       { it: 'Assist',    en: 'Assists'                       },
  'player.stl_label':       { it: 'Rubate',    en: 'Steals'                        },
  'player.fls_label':       { it: 'Falli',     en: 'Fouls'                         },
  'player.shots_label':     { it: 'Tiri',      en: 'Shooting'                      },
  'player.val_label':       { it: 'Valutazione', en: 'Efficiency'                      },
  'player.pm_label':        { it: '+/−',        en: '+/−'                          },
  'player.2pt_label':       { it: '2 Punti',   en: '2 Points'                      },
  'player.3pt_label':       { it: '3 Punti',   en: '3 Points'                      },
  'player.ft_label':        { it: 'Liberi',    en: 'Free Throws'                   },

  // Edit modal — log tiri
  'log.edit_shot_made':     { it: '{pts}pt Segnato — {zone} [modifica]',
                               en: '{pts}pt Made — {zone} [edit]'                  },
  'log.edit_shot_missed':   { it: '{pts}pt Sbagliato — {zone} [modifica]',
                               en: '{pts}pt Missed — {zone} [edit]'                },
  'log.edit_ft_made':       { it: 'TL segnato (+1) [modifica]',
                               en: 'FT made (+1) [edit]'                           },
  'log.edit_ft_missed':     { it: 'TL sbagliato [modifica]',
                               en: 'FT missed [edit]'                              },
  'log.edit_stat':          { it: '{label} [modifica]', en: '{label} [edit]'       },

  // Edit modal — toast tiri e TL
  'toast.edit_shot_made':   { it: '✅ {name}: +{pts} pts',
                               en: '✅ {name}: +{pts} pts'                         },
  'toast.edit_shot_missed': { it: '❌ {name}: Sbagliato',
                               en: '❌ {name}: Missed'                             },
  'toast.edit_ft_made':     { it: '🎯 {name}: TL segnato',
                               en: '🎯 {name}: FT made'                            },
  'toast.edit_ft_missed':   { it: '⭕ {name}: TL sbagliato',
                               en: '⭕ {name}: FT missed'                          },

  // Edit modal — stat labels mappa (usata anche nei toast)
  'stat.reb_off_label':     { it: 'Rimbalzo Off.', en: 'Off. Rebound'             },
  'stat.reb_def_label':     { it: 'Rimbalzo Dif.', en: 'Def. Rebound'             },
  'stat.steal_label':       { it: 'Palla Rubata',  en: 'Steal'                    },
  'stat.turnover_label':    { it: 'Palla Persa',   en: 'Turnover'                 },
  'stat.foul_label':        { it: 'Fallo Fatto',   en: 'Foul'                     },
  'stat.foul_drawn_label':  { it: 'Fallo Subito',  en: 'Foul Drawn'               },
  'stat.block_label':       { it: 'Stoppata Fatta',   en: 'Block'                 },
  'stat.block_against_label':{ it: 'Stoppata Subita', en: 'Block Against'         },

  // Nessun tiro registrato
  'misc.no_shots':          { it: 'Nessun tiro registrato',
                               en: 'No shots recorded'                             },
  // Nessuna azione nel log (edit)
  'misc.no_log_actions':    { it: 'Nessuna azione nel log',
                               en: 'No log actions'                                },
   
   // OTTIMIZZAZIONE REPORT ESPORTATO
  'report.export_disabled':    { it: 'Export disabilitato nelle impostazioni', en: 'Export disabled in settings'       },
  'report.exported_ok':    { it: 'Report esportato ✓', en: 'Report exported ✓'       },
};

// ═══ RUNTIME ══════════════════════════════════════════════════════

/** Lingua corrente. Viene sovrascritta da initApp() leggendo settings.language. */
let _lang = 'it';

/**
 * Ottieni la lingua corrente.
 * @returns {'it'|'en'}
 */
function getLang() { return _lang; }

/**
 * Imposta la lingua (senza salvare né aggiornare l'UI — usare setLanguage() per quello).
 * @param {'it'|'en'} lang
 */
function _setLangInternal(lang) {
  _lang = (lang === 'en') ? 'en' : 'it';
}

/**
 * Traduce una chiave nella lingua corrente.
 * Supporta interpolazione: t('toast.shot_made', {name:'Mario', pts:2, total:14})
 * sostituisce {name}, {pts}, {total} nel risultato.
 *
 * @param {string} key
 * @param {Object} [vars]
 * @returns {string}
 */
function t(key, vars) {
  const entry = STRINGS[key];
  if (!entry) {
    console.warn('[i18n] Missing key:', key);
    return key;
  }
  let str = entry[_lang] ?? entry['it'] ?? key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      str = str.replaceAll('{' + k + '}', v);
    }
  }
  return str;
}

/**
 * Restituisce il nome tradotto di una zona del campo.
 * Se la chiave non esiste, ritorna il nome originale invariato.
 * @param {string} zoneName — nome originale italiano (es. 'Canestro')
 * @returns {string}
 */
function tZone(zoneName) {
  return t('zone.' + zoneName, undefined) === ('zone.' + zoneName)
    ? zoneName
    : t('zone.' + zoneName);
}

/**
 * Cambia lingua, salva nelle impostazioni, aggiorna l'intera interfaccia.
 * Chiama applyI18n() (definita in app.js al passo 3) per aggiornare l'HTML statico.
 * @param {'it'|'en'} lang
 */
async function setLanguage(lang) {
  _setLangInternal(lang);
  settings.language = _lang;
  await saveSettings();
  if (typeof applyI18n === 'function') applyI18n();
  if (typeof renderSettings === 'function') renderSettings();
  toast(t(_lang === 'en' ? 'toast.lang_changed_en' : 'toast.lang_changed_it'));
}
