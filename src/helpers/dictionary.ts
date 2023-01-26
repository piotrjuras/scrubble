const words = `AA AD AG AJ AL AM AR AS AT AU AŻ BA BE BI BO BU BY CE CI CO DA DE DO DY EE EF EH EJ EL EŁ EM EN EŃ ER ES EŚ ET EW EZ FA FE FI FU GĘ GO HA HE HĘ HI HM HO HU ID II IŁ IM IN IW IŻ JA JĄ JE KA KI KO KU LA LI LU MA MĄ ME MI MU MY NA NI NO NY OD OJ OK OM ON OŃ OO OP OR OS OŚ OT OZ OŻ ÓD ÓS ÓW PA PE PI PO RE RO SĄ SE SI SU TA TĄ TE TĘ TO TS TU TY UD UF UL UT UU WE WU WY YY ZA ZE ŻE ABO ABY ACH ACZ AFT AGA AGĄ AGĘ AGI AGO AHA AIR AIS AJĆ AKR AKT ALA ALĄ ALB ALD ALE ALĘ ALF ALG ALI ALK ALO ALP ALT AMF ANA ANI ANO ANS ANT ARA ARĄ ARB ARĘ ARF ARK ARO ARS ARY ASA ASY ATA ATU ATY AUA AUĆ AUŁ AUR AUT AUU BAB BAĆ BAD BAI BAJ BAK BAL BAŁ BAM BAN BAŃ BAR BAS BAŚ BAT BAW BAZ BAŹ BĄK BEE BEG BEJ BEK BEL BER BET BEZ BEŻ BĘC BIB BIĆ BID BIG BIJ BIL BIŁ BIM BIO BIP BIS BIT BIZ BLA BLE BOA BOB BOĆ BOD BOI BOJ BOK BOL BOM BON BOP BOR BOT BOY BOŹ BÓB BÓG BÓJ BÓL BÓR BRR BRU BRY BUC BUD BUF BUG BUK BUL BUŁ BUM BUR BUS BUT BUU BUZ BUŹ BYĆ BYK BYŁ BYM BYŚ BYT BZU BZY BZZ CAB CAL CAP CAR CEK CEL CEŁ CEN CEŃ CEP CER CES CEW CEZ CHA CHE CHI CHU CIE CIĘ CII CIP CIS CIŹ CIŻ CLĄ CLE CLĘ CLI CŁA CŁO CŁU CNA CNĄ CNE CNI CNY COB COD COL COŚ CÓR CÓŻ CUĆ CUD CUG CUM CUP CYC CYG CYK CYM CYN CYT CZE CZI CZY ĆMA ĆMĄ ĆMĘ ĆMI ĆMO ĆMY ĆPA ĆŚŚ DAĆ DAG DAJ DAL DAŁ DAM DAN DAŃ DAO DAR DAT DĄB DĄĆ DĄŁ DĄS DĄŻ DBA DEJ DEK DEM DEN DER DES DĘB DĘĆ DĘG DIP DIS DIW DLA DMĄ DMĘ DNA DNĄ DNĘ DNI DNO DNU DNY DOG DOI DOK DOL DOM DON DOŃ DOZ DÓB DÓJ DÓL DÓŁ DÓZ DRĄ DRĘ DRR DRY DUB DUD DUG DUH DUM DUO DUP DUR DUŚ DWA DWU DYB DYG DYL DYM DYN DYŃ DYR DYZ ECH ECU EFA EFĄ EFĘ EFO EFY EGO EHE EHM EIS EKO EKS ELF ELO EMO EMU END ENT EON ERA ERĄ ERB ERĘ ERG ERO ERY ESA ESU ESY ETA ETĄ ETĘ ETO ETY EWA EWĄ EWE EWĘ EWO EWY EZA EZĄ EZĘ EZO EZY ĘSI FAG FAI FAJ FAL FAŁ FAM FAN FAR FAS FAZ FEE FEN FES FET FEZ FIG FIK FIL FIN FIS FIŚ FIT FIU FIZ FIŹ FOĆ FOK FOL FON FOR FOS FOT FRR FRU FUG FUJ FUL FUM FUN FUR FUS FUU FYL GAĆ GAD GAF GAG GAI GAJ GAL GAŁ GAM GAŃ GAP GAR GAŚ GAY GAZ GAŻ GĄB GDY GEJ GEM GEN GES GEZ GĘB GĘG GĘŚ GHI GIB GID GIE GIF GIG GIK GIL GIN GIŃ GIR GIS GIT GNA GNĄ GNĘ GNU GOI GOJ GOL GON GOŃ GOT GÓJ GÓL GÓR GRA GRĄ GRĘ GRO GRR GRU GRY GUB GUL GUM GUŃ GUR GUZ GZA GZĄ GZĘ GZI GZO GZY GŻĄ GŻĘ HAF HAI HAJ HAK HAL HAN HAO HAS HAU HEC HEH HEJ HEL HEM HEN HEP HER HET HIF HIP HIS HIT HIW HMM HOC HOI HOJ HOL HOP HOR HOT HOY HUB HUF HUK HUN HUT HYC HYR HYŚ HYZ HYŹ IBO ICH IDĄ IDĘ IDO IDU IDY IDŹ IGR IKR IKS IKT ILE ILU IŁU IŁY IMA IMĄ IMĆ IMĘ INB IND INF INR IRG ISK IŚĆ ITR IWA IWĄ IWĘ IWO IWY IZB IZM JAĆ JAD JAG JAJ JAK JAM JAP JAR JAŚ JAT JAW JAZ JAŹ JĄĆ JĄŁ JEB JEJ JEM JEN JER JET JEŻ JĘĆ JĘK JĘT JIG JIN JOD JOG JOJ JOL JON JOR JOT JUG JUK JUM JUN JUR JUS JUT JUZ JUŻ KAC KAI KAŁ KAM KAN KAŃ KAP KAR KAS KAT KAW KAŹ KAŻ KĄP KĄT KEG KEA KEĄ KEE KEĘ KEI KEJ KEK KEM KEO KER KET KĘP KĘS KIC KIĆ KIE KIJ KIL KIŁ KIM KIN KIP KIR KIŚ KIT KIŹ KLE KLO KŁA KŁY KOC KOĆ KOB KOD KOG KOI KOK KOL KOM KOŃ KOP KOR KOS KOŚ KOT KÓJ KÓŁ KÓP KÓZ KPA KPI KPY KRA KRĄ KRĘ KRO KRY KSI KTO KUB KUC KUĆ KUF KUJ KUK KUL KUŁ KUM KUN KUP KUR KUŚ KWA KWI KYU LAB LAĆ LAD LAG LAI LAK LAL LAŁ LAM LAŃ LAR LAS LAT LAW LĄC LĄD LĄG LEC LEĆ LEG LEI LEJ LEK LEN LEŃ LEP LES LEU LEW LEŹ LEŻ LĘG LĘK LIC LID LIG LIK LIM LIN LIP LIR LIS LIT LIZ LIŻ LNU LNY LOB LOG LOK LOL LOR LOS LOT LÓD LÓŻ LUB LUD LUF LUJ LUK LUM LUN LUŃ LUO LUP LUR LUT LUZ LWA LWI LWU LWY LŻĄ LŻĘ LŻY ŁAD ŁAJ ŁAŁ ŁAM ŁAN ŁAŃ ŁAP ŁAŚ ŁAT ŁAW ŁAŹ ŁĄG ŁĄK ŁBA ŁBU ŁBY ŁEB ŁEZ ŁĘG ŁĘK ŁĘT ŁKA ŁOI ŁOM ŁON ŁOŚ ŁÓJ ŁÓW ŁÓZ ŁÓŻ ŁUB ŁUG ŁUK ŁUN ŁUP ŁUT ŁUZ ŁYD ŁYK ŁYP ŁZA ŁZĄ ŁZĘ ŁZO ŁZY ŁŻĄ ŁŻE ŁŻĘ MAC MAĆ MAD MAG MAI MAJ MAK MAM MAN MAŃ MAP MAR MAS MAT MAU MAŹ MAŻ MĄĆ MĄK MĄT MĄŻ MEE MEH MEJ MEL MEM MEN MER MES MET MEW MĘT MHM MIĘ MIG MIK MIL MIM MIN MIŃ MIR MIS MIŚ MIT MNĄ MNĘ MOA MOB MOC MOD MOI MOL MON MOP MOR MÓC MÓD MÓJ MÓL MÓR MÓW MÓŻ MRĄ MRĘ MRR MRU MUC MUF MUL MUŁ MUN MUR MUS MUŚ MUU MUZ MYC MYĆ MYJ MYK MYL MYŁ MYM MYT MŻĄ MŻĘ MŻY NAĆ NAD NAJ NAM NAŃ NAP NAR NAS NAT NAW NEF NEK NEM NEP NER NET NĘĆ NĘK NIĄ NIC NIĆ NIE NIL NIM NIP NIT NIW NIŻ NOC NOK NOM NON NOR NOS NOŚ NOT NOŻ NÓG NÓW NÓŹ NÓŻ NUĆ NUD NUL NUR NUT NUŻ NYG NYŻ OAZ OBA OBI OBŁ OBU OBY OCH OĆM ODA ODĄ ODE ODĘ ODM ODO ODR ODY OES OFF OGI OGR OHM OHO OJĆ OKA OKI OKO OKR OKU OLE OLS OMA OMY ONA ONĄ ONE ONI ONO OPA OPU OPY ORA ORD ORF ORK ORO ORT ORU ORZ OSA OSĄ OSĘ OSI OSM OSO OSP OSY OŚĆ OTO OUT OWA OWĄ OWE OWI OWO OZU OZY ÓCZ PAC PAĆ PAD PAF PAI PAJ PAK PAL PAŁ PAM PAN PAŃ PAP PAR PAS PAŚ PAT PAW PAŹ PĄK PĄS PEN PEL PER PET PĘD PĘK PĘT PĘZ PFE PFF PFU PHI PHO PHU PHY PIA PIC PIĆ PIF PII PIJ PIK PIL PIŁ PIN PIP PIŚ PIT PIW PLE PNĄ PNĘ PNI POĆ POD POI POŃ POP POR POT PÓJ PÓL PÓŁ PÓR PÓZ PRĄ PRĘ PRO PRR PSA PSI PSS PST PSU PSY PUB PUC PUD PUF PUH PUK PUL PUM PUN PUP PYK PYL PYŁ PYR PYŚ PYT PYZ RAB RAC RAD RAF RAG RAI RAJ RAK RAM RAN RAŃ RAP RAS RAT RAZ RAŹ RĄB RĄK RĄŚ REA REB RED REF REI REJ REK REL REM REN REO REP RET REW REŻ RHO ROB ROD ROI ROK ROL ROŃ ROP ROS ROŚ ROT RÓB RÓD RÓG RÓJ RÓL RÓW RÓŻ RUD RUF RUG RUI RUJ RUM RUN RUŃ RUR RUS RUT RWA RWĄ RWĘ RWO RWY RYB RYĆ RYG RYJ RYK RYŁ RYM RYP RYS RYŚ RYT RYZ RYŻ RŻĄ RŻE RŻĘ RŻY SAD SAG SAK SAL SAM SAŃ SAP SĄD SĄG SEC SEM SEN SEP SER SET SĘK SĘP SIA SIĄ SIC SIE SIĘ SIK SIL SIŁ SIM SIO SIR SIT SIU SIW SKA SKI SNĄ SNĘ SNU SNY SOB SOF SOI SOK SOL SOM SON SOS SOU SÓD SÓL SÓW SPA SRA SRU SSĄ SSĘ STO STU SUB SUK SUM SUŃ SUR SUS SUT SUW SWA SWĄ SWE SYĆ SYF SYK SYN SYP SYR SYT SZA SZU ŚLĄ ŚLE ŚLĘ ŚMO ŚNI ŚPI TAB TAC TAF TAG TAI TAJ TAK TAL TAM TAN TAO TAR TAS TAŚ TAU TAŻ TĄP TĄŻ TEJ TEK TEŁ TEN TER TET TEZ TEŻ TĘP TĘŻ TFU TIK TIP TIR TKA TLĄ TLE TLĘ TLI TŁA TŁO TŁU TNĄ TNĘ TOĆ TOG TOK TOM TON TOŃ TOP TOR TOS TOY TOŻ TÓG TRA TRĄ TRĘ TRI TRR TRY TSS TUB TUF TUI TUJ TUK TUL TUM TUP TUR TUT TUZ TUŻ TWA TWĄ TWE TYĆ TYJ TYK TYŁ TYM TYN TYP TYŚ UCH UCZ UDA UDO UDU UED UFA UFF UFO UHA UHM UHU UJE UJM ULA ULE ULG ULI ULU ULW UMB UPS URN UST UTA UTĄ UTĘ UTO UTY UZD WAB WAD WAG WAL WAŁ WAM WAN WAR WAS WAT WAZ WAŻ WĄS WĄŻ WDA WEB WEK WEN WEŃ WEP WET WEŹ WĘD WĘZ WIC WIĆ WID WIE WIG WIJ WIŁ WIN WIŃ WIO WIR WIŚ WIZ WOJ WOK WON WOŃ WOW WOŹ WÓD WÓL WÓŁ WÓR WÓZ WÓŹ WRĄ WRE WRĘ WRR WSI WTE WUJ WYĆ WYG WYJ WYK WYŁ WYR WYZ WYŻ YAM YHM YHY YIN ZAD ZAŃ ZAŚ ZĄB ZDA ZEK ZEŁ ZEN ZEŃ ZER ZET ZEW ZEZ ZĘZ ZIM ZIN ZIP ZIU ZJE ZŁA ZŁĄ ZŁE ZŁO ZŁU ZŁY ZNA ZOL ZON ZOO ZUP ZWĄ ZWĘ ZWU ZWY ZYS ZZA ŹGA ŹLE ŹLI ŻAB ŻAK ŻAL ŻAR ŻĄĆ ŻĄŁ ŻĄP ŻEL ŻEN ŻEŃ ŻER ŻET ŻĘĆ ŻGA ŻNĄ ŻNĘ ŻON ŻRĄ ŻRE ŻRĘ ŻUĆ ŻUJ ŻUK ŻUL ŻUŁ ŻUP ŻUR ŻYĆ ŻYD ŻYJ ŻYŁ ŻYR ŻYT ŻYW
`;

console.log( words.split(' ').map(word => word.toUpperCase()) );

export const approvedWords: string[] = words.split(' ').map(word => word.toUpperCase());